package api

import (
	"encoding/json"
	"fmt"
	"html"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/lcontesini/proxima-viagem/internal/ai"
	"github.com/lcontesini/proxima-viagem/internal/cache"
	"github.com/lcontesini/proxima-viagem/internal/models"
)

type Handler struct {
	cache    *cache.Cache
	aiClient *ai.Client
}

// escapeXML escapes special characters for XML
func escapeXML(s string) string {
	// Replace common problematic characters
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, "\"", "&quot;")
	s = strings.ReplaceAll(s, "'", "&apos;")
	return s
}

// LoggingMiddleware logs request details and response time
func LoggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next(w, r)
		log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	}
}

func NewHandler(cache *cache.Cache, aiClient *ai.Client) *Handler {
	return &Handler{
		cache:    cache,
		aiClient: aiClient,
	}
}

func (h *Handler) GetDailyDestination(w http.ResponseWriter, r *http.Request) {
	startTime := time.Now()
	defer func() {
		log.Printf("GetDailyDestination took %v", time.Since(startTime))
	}()

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Verificar se deve ignorar cache (query param ou header)
	forceParam := r.URL.Query().Get("force")
	forceHeader := r.Header.Get("X-Force-New")
	ignoreCache := forceParam == "true" || forceHeader == "true"

	log.Printf("🔍 Debug - force param: '%s', force header: '%s', ignoreCache: %v", forceParam, forceHeader, ignoreCache)

	// Adicionar headers de cache
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "public, max-age=3600") // Cache por 1 hora
	w.Header().Set("ETag", `"destination-daily"`)

	// Verificar se já temos um destino para hoje (a menos que force seja true)
	if !ignoreCache {
		destination, found := h.cache.Get()
		if found {
			log.Println("✅ Returning cached destination for today")
			json.NewEncoder(w).Encode(destination)
			return
		}
	} else {
		log.Println("🔄 Force parameter detected - ignoring cache")
	}

	// Não temos destino para hoje, tentar gerar um novo
	log.Println("🔄 No destination for today, fetching new one from AI")
	destination, err := h.aiClient.GetDailyDestination()
	if err != nil {
		log.Printf("❌ Error fetching destination from AI: %v", err)

		// Se estamos ignorando cache (force=true), não usar fallback - retornar erro
		if ignoreCache {
			log.Println("🚫 Force mode - not using fallback, returning error")
			http.Error(w, "Error fetching destination from AI and force mode prevents fallback", http.StatusInternalServerError)
			return
		}

		// Tentar usar fallback de destino antigo apenas se não for force
		fallbackDestination, fallbackFound := h.cache.GetFallbackDestination()
		if fallbackFound {
			// Verificar se é destino estático de emergência
			if strings.HasPrefix(fallbackDestination.ID, "dest-emergency-") {
				log.Printf("🚨 Using EMERGENCY static fallback: %s", fallbackDestination.Name)
				w.Header().Set("X-Fallback", "emergency")
				w.Header().Set("X-Fallback-Type", "static")
			} else {
				log.Printf("🎲 Using RANDOM fallback destination: %s (from %s)",
					fallbackDestination.Name,
					fallbackDestination.Date.Format("2006-01-02"))
				w.Header().Set("X-Fallback", "random")
				w.Header().Set("X-Fallback-Date", fallbackDestination.Date.Format("2006-01-02"))
			}

			json.NewEncoder(w).Encode(fallbackDestination)
			return
		}

		// Se não há nenhum fallback disponível, retornar erro
		log.Println("❌ No fallback destination available")
		http.Error(w, "Error fetching destination and no fallback available", http.StatusInternalServerError)
		return
	}

	// Sucesso! Salvar no cache apenas se não for force
	log.Printf("✅ Successfully fetched new destination: %s", destination.Name)
	if !ignoreCache {
		h.cache.Set(destination)
		log.Printf("💾 Destination saved to cache")
	} else {
		log.Printf("🚫 Force mode - destination NOT saved to cache")
	}
	json.NewEncoder(w).Encode(destination)
}

func (h *Handler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func (h *Handler) ClearCache(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	h.cache.Clear()
	log.Println("Cache cleared successfully")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Cache cleared successfully"})
}

// AddDestination adiciona um destino manualmente ao cache
func (h *Handler) AddDestination(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var destination models.Destination
	if err := json.NewDecoder(r.Body).Decode(&destination); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Adicionar ao cache
	h.cache.Set(&destination)

	log.Printf("Added destination to cache: %s", destination.Name)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message":     "Destination added to cache successfully",
		"destination": destination.Name,
	})
}

// GetAllDestinations retorna todos os destinos em cache
func (h *Handler) GetAllDestinations(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	destinations := h.cache.GetAll()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(destinations)
}

// GetMetrics retorna métricas de performance da API
func (h *Handler) GetMetrics(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	destinations := h.cache.GetAll()
	recentDestinations := h.cache.GetRecentDestinations()

	// Verificar se temos destino para hoje
	_, hasTodayDestination := h.cache.Get()

	// Verificar se temos fallback disponível
	_, hasFallback := h.cache.GetFallbackDestination()

	// Calcular data do último destino
	var lastDestinationDate string
	if len(destinations) > 0 {
		var latestTime time.Time
		for _, dest := range destinations {
			if dest.Date.After(latestTime) {
				latestTime = dest.Date
			}
		}
		lastDestinationDate = latestTime.Format("2006-01-02")
	}

	// Informações sobre destinos recentes
	var recentDestinationsInfo []map[string]interface{}
	for _, dest := range recentDestinations {
		recentDestinationsInfo = append(recentDestinationsInfo, map[string]interface{}{
			"name": dest.Name,
			"date": dest.Date.Format("2006-01-02"),
		})
	}

	metrics := map[string]interface{}{
		"total_destinations":       len(destinations),
		"recent_destinations":      len(recentDestinations),
		"recent_destinations_list": recentDestinationsInfo,
		"has_today_destination":    hasTodayDestination,
		"has_fallback":             hasFallback,
		"last_destination_date":    lastDestinationDate,
		"cache_status":             "active",
		"timestamp":                time.Now().Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(metrics)
}

func (h *Handler) GetTestDestination(w http.ResponseWriter, r *http.Request) {
	// Verificar se já existe no cache primeiro
	destination, found := h.cache.Get()
	if found {
		log.Println("Returning cached destination for test endpoint")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(destination)
		return
	}

	// Detecta o idioma preferido do usuário
	acceptLang := r.Header.Get("Accept-Language")
	lang := "pt" // default

	if strings.Contains(acceptLang, "en") {
		lang = "en"
	} else if strings.Contains(acceptLang, "es") {
		lang = "es"
	}

	var testJSON string

	switch lang {
	case "en":
		testJSON = `{
  "id": "dest-test-123",
  "name": "Gramado",
  "country": "Brazil",
  "description": "Gramado is a charming city in the Serra Gaúcha, known for its European architecture, artisanal chocolates and mountain climate.",
  "detailedInfo": "Founded by German and Italian immigrants, Gramado preserves European traditions in its architecture, gastronomy and culture. The city is famous for its festivals, such as the Christmas Lights.",
  "imageUrl": "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
  "images": [
    "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  ],
  "tips": [
    "Book hotels in advance during Christmas Lights",
    "Try artisanal chocolates at local factories",
    "Wear warm clothes in winter",
    "Rent a car to explore the region",
    "Avoid long weekends",
    "Visit attractions in the morning"
  ],
  "attractions": [
    {
      "name": "Covered Street",
      "description": "Shopping and gastronomy center with alpine architecture",
      "duration": "2-3 hours",
      "price": "Free"
    },
    {
      "name": "Mini World",
      "description": "Theme park with perfect miniatures",
      "duration": "2-3 hours",
      "price": "$12-16"
    },
    {
      "name": "Black Lake",
      "description": "Artificial lake surrounded by pine forest",
      "duration": "1-2 hours",
      "price": "Free"
    },
    {
      "name": "Snowland",
      "description": "Indoor snow park unique in Brazil",
      "duration": "3-4 hours",
      "price": "$30-40"
    },
    {
      "name": "Gramado Zoo",
      "description": "Modern zoo with over 1,500 animals",
      "duration": "3-4 hours",
      "price": "$16-20"
    },
    {
      "name": "Le Jardin Lavender Park",
      "description": "Beautiful park with lavender fields",
      "duration": "1-2 hours",
      "price": "$8-12"
    }
  ],
  "bestTime": "June to August to enjoy the cold and European winter atmosphere",
  "budget": {
    "low": "$40-60 per day",
    "medium": "$80-120 per day",
    "high": "$160-240 per day"
  },
  "transportation": "By plane: fly to Porto Alegre and rent a car. In the city, you can walk around the center.",
  "accommodation": "Center, Planalto or Carniel. Boutique hotels, inns or Airbnb in chalets.",
  "localCuisine": [
    "Fondue - traditional Swiss with cheese or chocolate",
    "Galeto al primo canto - grilled chicken",
    "Apfelstrudel - German apple pie",
    "Colonial coffee sequence",
    "Wine and sparkling wine from Serra Gaúcha"
  ],
  "date": "2025-10-06T00:10:00-03:00"
}`
	case "es":
		testJSON = `{
  "id": "dest-test-123",
  "name": "Gramado",
  "country": "Brasil",
  "description": "Gramado es una encantadora ciudad en la Serra Gaúcha, conocida por su arquitectura europea, chocolates artesanales y clima de montaña.",
  "detailedInfo": "Fundada por inmigrantes alemanes e italianos, Gramado preserva tradiciones europeas en su arquitectura, gastronomía y cultura. La ciudad es famosa por sus festivales, como el Natal Luz.",
  "imageUrl": "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
  "images": [
    "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  ],
  "tips": [
    "Reserve hoteles con anticipación durante el Natal Luz",
    "Pruebe los chocolates artesanales en las fábricas locales",
    "Use ropa abrigada en invierno",
    "Alquile un auto para explorar la región",
    "Evite los fines de semana largos",
    "Visite las atracciones por la mañana"
  ],
  "attractions": [
    {
      "name": "Calle Cubierta",
      "description": "Centro de compras y gastronomía con arquitectura alpina",
      "duration": "2-3 horas",
      "price": "Gratis"
    },
    {
      "name": "Mini Mundo",
      "description": "Parque temático con miniaturas perfectas",
      "duration": "2-3 horas",
      "price": "R$ 60-80"
    },
    {
      "name": "Lago Negro",
      "description": "Lago artificial rodeado de bosque de pinos",
      "duration": "1-2 horas",
      "price": "Gratis"
    },
    {
      "name": "Snowland",
      "description": "Parque de nieve indoor único en Brasil",
      "duration": "3-4 horas",
      "price": "R$ 150-200"
    },
    {
      "name": "Gramado Zoo",
      "description": "Zoológico moderno con más de 1.500 animales",
      "duration": "3-4 horas",
      "price": "R$ 80-100"
    },
    {
      "name": "Le Jardin Parque de Lavanda",
      "description": "Hermoso parque con campos de lavanda",
      "duration": "1-2 horas",
      "price": "R$ 40-60"
    }
  ],
  "bestTime": "Junio a agosto para disfrutar del frío y la atmósfera de invierno europeo",
  "budget": {
    "low": "R$ 200-300 por día",
    "medium": "R$ 400-600 por día",
    "high": "R$ 800-1200 por día"
  },
  "transportation": "En avión: vuele a Porto Alegre y alquile un auto. En la ciudad, es posible caminar por el centro.",
  "accommodation": "Centro, Planalto o Carniel. Hoteles boutique, posadas o Airbnb en chalets.",
  "localCuisine": [
    "Fondue - tradicional suizo con queso o chocolate",
    "Galeto al primo canto - pollo asado a la brasa",
    "Apfelstrudel - tarta de manzana alemana",
    "Secuencia de café colonial",
    "Vino y espumoso de la Serra Gaúcha"
  ],
  "date": "2025-10-06T00:10:00-03:00"
}`
	default: // pt
		testJSON = `{
  "id": "dest-test-123",
  "name": "Gramado",
  "country": "Brasil",
  "description": "Gramado é uma charmosa cidade na Serra Gaúcha, conhecida por sua arquitetura europeia, chocolates artesanais e clima de montanha.",
  "detailedInfo": "Fundada por imigrantes alemães e italianos, Gramado preserva tradições europeias em sua arquitetura, gastronomia e cultura. A cidade é famosa por seus festivais, como o Natal Luz.",
  "imageUrl": "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
  "images": [
    "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  ],
  "tips": [
    "Reserve hotéis com antecedência durante o Natal Luz",
    "Experimente os chocolates artesanais nas fábricas locais",
    "Use roupas quentes no inverno",
    "Alugue um carro para explorar a região",
    "Evite fins de semana prolongados",
    "Visite as atrações pela manhã"
  ],
  "attractions": [
    {
      "name": "Rua Coberta",
      "description": "Centro de compras e gastronomia com arquitetura alpina",
      "duration": "2-3 horas",
      "price": "Grátis"
    },
    {
      "name": "Mini Mundo",
      "description": "Parque temático com miniaturas perfeitas",
      "duration": "2-3 horas",
      "price": "R$ 60-80"
    },
    {
      "name": "Lago Negro",
      "description": "Lago artificial cercado por bosque de pinheiros",
      "duration": "1-2 horas",
      "price": "Grátis"
    },
    {
      "name": "Snowland",
      "description": "Parque de neve indoor único no Brasil",
      "duration": "3-4 horas",
      "price": "R$ 150-200"
    },
    {
      "name": "Gramado Zoo",
      "description": "Zoológico moderno com mais de 1.500 animais",
      "duration": "3-4 horas",
      "price": "R$ 80-100"
    },
    {
      "name": "Le Jardin Parque de Lavanda",
      "description": "Lindo parque com campos de lavanda",
      "duration": "1-2 horas",
      "price": "R$ 40-60"
    }
  ],
  "bestTime": "Junho a agosto para curtir o frio e a atmosfera de inverno europeu",
  "budget": {
    "low": "R$ 200-300 por dia",
    "medium": "R$ 400-600 por dia",
    "high": "R$ 800-1200 por dia"
  },
  "transportation": "De avião: voe para Porto Alegre e alugue um carro. Na cidade, é possível caminhar pelo centro.",
  "accommodation": "Centro, Planalto ou Carniel. Hotéis boutique, pousadas ou Airbnb em chalés.",
  "localCuisine": [
    "Fondue - tradicional suíço com queijo ou chocolate",
    "Galeto al primo canto - frango assado na brasa",
    "Apfelstrudel - torta de maçã alemã",
    "Sequência de café colonial",
    "Vinho e espumante da Serra Gaúcha"
  ],
  "date": "2025-10-06T00:10:00-03:00"
}`
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(testJSON))
}

// GenerateSitemap generates a dynamic sitemap including all destinations
func (h *Handler) GenerateSitemap(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get all destinations from cache
	destinations := h.cache.GetAll()

	// Base URL for the site
	baseURL := "https://proxima-viagem.netlify.app"

	// Start building the sitemap XML
	sitemap := `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`

	// Add static pages
	staticPages := []struct {
		URL          string
		LastMod      string
		ChangeFreq   string
		Priority     string
		HasImage     bool
		ImageURL     string
		ImageTitle   string
		ImageCaption string
	}{
		{
			URL:          "/",
			LastMod:      time.Now().Format("2006-01-02"),
			ChangeFreq:   "daily",
			Priority:     "1.0",
			HasImage:     true,
			ImageURL:     "/og-image.svg",
			ImageTitle:   "Próxima Viagem - Destinos de Viagem Diários",
			ImageCaption: "Descubra um novo destino de viagem todos os dias com dicas exclusivas e roteiros completos",
		},
		{
			URL:        "/about.html",
			LastMod:    time.Now().Format("2006-01-02"),
			ChangeFreq: "monthly",
			Priority:   "0.8",
		},
		{
			URL:        "/contact.html",
			LastMod:    time.Now().Format("2006-01-02"),
			ChangeFreq: "monthly",
			Priority:   "0.7",
		},
		{
			URL:        "/privacy.html",
			LastMod:    time.Now().Format("2006-01-02"),
			ChangeFreq: "yearly",
			Priority:   "0.5",
		},
		{
			URL:        "/terms.html",
			LastMod:    time.Now().Format("2006-01-02"),
			ChangeFreq: "yearly",
			Priority:   "0.5",
		},
	}

	// Add static pages to sitemap
	for _, page := range staticPages {
		sitemap += fmt.Sprintf(`
  <url>
    <loc>%s%s</loc>
    <lastmod>%s</lastmod>
    <changefreq>%s</changefreq>
    <priority>%s</priority>`, baseURL, page.URL, page.LastMod, page.ChangeFreq, page.Priority)

		if page.HasImage {
			sitemap += fmt.Sprintf(`
    <image:image>
      <image:loc>%s%s</image:loc>
      <image:title>%s</image:title>
      <image:caption>%s</image:caption>
    </image:image>`, baseURL, page.ImageURL, escapeXML(page.ImageTitle), escapeXML(page.ImageCaption))
		}

		sitemap += `
  </url>`
	}

	// Add destination pages
	for _, dest := range destinations {
		// Create destination URL (you might want to adjust this based on your frontend routing)
		destURL := fmt.Sprintf("/destination/%s", dest.ID)
		lastMod := dest.Date.Format("2006-01-02")

		sitemap += fmt.Sprintf(`
  <url>
    <loc>%s%s</loc>
    <lastmod>%s</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>%s</image:loc>
      <image:title>%s - %s</image:title>
      <image:caption>%s</image:caption>
    </image:image>`, baseURL, destURL, lastMod, dest.ImageURL, escapeXML(dest.Name), escapeXML(dest.Country), escapeXML(dest.Description))

		// Add additional images if available
		for i, img := range dest.Images {
			if i > 0 && i < 5 { // Limit to 5 images per destination
				sitemap += fmt.Sprintf(`
    <image:image>
      <image:loc>%s</image:loc>
      <image:title>%s - %s</image:title>
    </image:image>`, img, escapeXML(dest.Name), escapeXML(dest.Country))
			}
		}

		sitemap += `
  </url>`
	}

	sitemap += `
</urlset>`

	// Set appropriate headers
	w.Header().Set("Content-Type", "application/xml")
	w.Header().Set("Cache-Control", "public, max-age=3600") // Cache for 1 hour

	// Write the sitemap
	w.Write([]byte(sitemap))

	log.Printf("Generated sitemap with %d destinations", len(destinations))
}
