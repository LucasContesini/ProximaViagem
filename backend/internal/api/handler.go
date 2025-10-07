package api

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/lcontesini/proxima-viagem/internal/ai"
	"github.com/lcontesini/proxima-viagem/internal/cache"
	"github.com/lcontesini/proxima-viagem/internal/models"
)

type Handler struct {
	cache    *cache.Cache
	aiClient *ai.Client
}

func NewHandler(cache *cache.Cache, aiClient *ai.Client) *Handler {
	return &Handler{
		cache:    cache,
		aiClient: aiClient,
	}
}

func (h *Handler) GetDailyDestination(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	destination, found := h.cache.Get()
	if found {
		log.Println("Returning cached destination")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(destination)
		return
	}

	log.Println("Fetching new destination from AI")
	destination, err := h.aiClient.GetDailyDestination()
	if err != nil {
		log.Printf("Error fetching destination from AI: %v", err)
		
		// Fallback: tentar pegar um destino aleatório dos últimos 7
		fallbackDestination, fallbackFound := h.cache.GetRandomRecentDestination()
		if fallbackFound {
			log.Println("Using fallback destination from recent cache")
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(fallbackDestination)
			return
		}
		
		// Se não há fallback disponível, retornar erro
		http.Error(w, "Error fetching destination", http.StatusInternalServerError)
		return
	}

	h.cache.Set(destination)

	w.Header().Set("Content-Type", "application/json")
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
		"message": "Destination added to cache successfully",
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

// GetRandomDestination retorna um destino aleatório do cache ou gera um novo
func (h *Handler) GetRandomDestination(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	destinations := h.cache.GetAll()
	if len(destinations) == 0 {
		// Se não tem nada em cache, pega o destino do dia
		destination, found := h.cache.Get()
		if !found {
			// Se também não tem destino do dia, gera um novo
			log.Println("No destinations in cache, generating new one for random endpoint")
			newDestination, err := h.aiClient.GetDailyDestination()
			if err != nil {
				log.Printf("Error fetching destination: %v", err)
				http.Error(w, "Error fetching destination", http.StatusInternalServerError)
				return
			}
			h.cache.Set(newDestination)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(newDestination)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(destination)
		return
	}

	// Retorna um destino aleatório
	randomIndex := len(destinations) / 2 // Simplificado, pode usar math/rand
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(destinations[randomIndex])
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
