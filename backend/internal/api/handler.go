package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/lcontesini/proxima-viagem/internal/ai"
	"github.com/lcontesini/proxima-viagem/internal/cache"
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
		log.Printf("Error fetching destination: %v", err)
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

// GetRandomDestination retorna um destino aleatório do cache
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
			http.Error(w, "No destinations available", http.StatusNotFound)
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
	testJSON := `{
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

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(testJSON))
}
