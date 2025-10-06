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

