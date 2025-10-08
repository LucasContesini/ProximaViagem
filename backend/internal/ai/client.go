package ai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/lcontesini/proxima-viagem/internal/models"
)

type Client struct {
	apiKey     string
	apiURL     string
	httpClient *http.Client
}

func NewClient() *Client {
	useFreeAI := os.Getenv("USE_FREE_AI") == "true"

	var apiKey, apiURL string
	if useFreeAI {
		apiKey = os.Getenv("FREE_AI_KEY")
		apiURL = os.Getenv("FREE_AI_URL")
		if apiURL == "" {
			apiURL = "https://api.groq.com/openai/v1/chat/completions"
		}
	} else {
		apiKey = os.Getenv("OPENAI_API_KEY")
		apiURL = "https://api.openai.com/v1/chat/completions"
	}

	return &Client{
		apiKey: apiKey,
		apiURL: apiURL,
		httpClient: &http.Client{
			Timeout: 15 * time.Second, // Reduzido de 30s para 15s
			Transport: &http.Transport{
				MaxIdleConns:        100,
				MaxIdleConnsPerHost: 10,
				IdleConnTimeout:     90 * time.Second,
			},
		},
	}
}

func (c *Client) GetDailyDestination() (*models.Destination, error) {
	startTime := time.Now()
	defer func() {
		log.Printf("AI request took %v", time.Since(startTime))
	}()

	prompt := `Sugira um destino turístico brasileiro. Responda APENAS em JSON válido:

{
  "name": "Nome da cidade",
  "country": "Brasil", 
  "description": "Descrição envolvente em 2-3 frases",
  "detailedInfo": "Informação detalhada sobre história, cultura e características únicas",
  "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
  "images": [
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
    "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800", 
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800"
  ],
  "tips": [
    "Dica prática 1",
    "Dica sobre segurança/economia", 
    "Dica cultural",
    "Dica de transporte",
    "O que evitar",
    "Melhor horário"
  ],
  "attractions": [
    {"name": "Atração 1", "description": "Descrição", "duration": "2-3h", "price": "R$ 20-50"},
    {"name": "Atração 2", "description": "Descrição", "duration": "1-2h", "price": "Grátis"},
    {"name": "Atração 3", "description": "Descrição", "duration": "3-4h", "price": "R$ 50-100"},
    {"name": "Atração 4", "description": "Descrição", "duration": "2h", "price": "R$ 30-60"},
    {"name": "Atração 5", "description": "Descrição", "duration": "1h", "price": "R$ 15-30"},
    {"name": "Atração 6", "description": "Descrição", "duration": "2-3h", "price": "R$ 40-80"}
  ],
  "bestTime": "Melhor época com clima e eventos",
  "budget": {
    "low": "R$ 150-250/dia (hostel, comida simples)",
    "medium": "R$ 300-500/dia (hotel médio, restaurantes)",
    "high": "R$ 600-1000/dia (hotel luxo, gastronomia)"
  },
  "transportation": "Como chegar e se locomover",
  "accommodation": "Onde se hospedar e bairros recomendados",
  "localCuisine": [
    "Prato típico 1",
    "Prato típico 2", 
    "Prato típico 3",
    "Bebida típica"
  ]
}

Use APENAS estas URLs de imagem (escolha 4 DIFERENTES para cada destino):
- https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800 (Rio de Janeiro)
- https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800 (Praia brasileira)
- https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800 (Cristo Redentor)
- https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800 (Natureza Brasil)
- https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800 (Praia tropical)
- https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800 (Paisagem montanhosa)
- https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800 (Floresta tropical)
- https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800 (Cidade histórica)
- https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800 (Águas cristalinas)
- https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800 (Mergulho/aventura)
- https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800 (Vida marinha)
- https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800 (Praia paradisíaca)
- https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800 (Arquitetura colonial)
- https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800 (Lago/mirante)
- https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800 (Centro histórico)
- https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800 (Aventura/trilha)

IMPORTANTE: Escolha 4 URLs DIFERENTES e que façam sentido para o destino específico!`

	reqBody := models.AIRequest{
		Model: "llama-3.3-70b-versatile",
		Messages: []models.AIMessage{
			{
				Role:    "system",
				Content: "Você é um especialista em turismo brasileiro com conhecimento profundo sobre destinos, cultura, gastronomia e dicas práticas de viagem. Sempre responda em JSON válido com informações detalhadas e úteis. IMPORTANTE: Para as imagens, escolha 4 URLs DIFERENTES da lista fornecida que façam sentido para o destino específico (ex: para praias use imagens de praia, para cidades históricas use arquitetura colonial, etc).",
			},
			{
				Role:    "user",
				Content: prompt,
			},
		},
		MaxTokens: 2000, // Reduzido de 3000 para 2000
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("error marshaling request: %w", err)
	}

	req, err := http.NewRequest("POST", c.apiURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.apiKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API error (status %d): %s", resp.StatusCode, string(body))
	}

	var aiResp models.AIResponse
	if err := json.Unmarshal(body, &aiResp); err != nil {
		return nil, fmt.Errorf("error unmarshaling AI response: %w", err)
	}

	if len(aiResp.Choices) == 0 {
		return nil, fmt.Errorf("no choices in AI response")
	}

	content := aiResp.Choices[0].Message.Content
	content = strings.TrimSpace(content)
	content = strings.TrimPrefix(content, "```json")
	content = strings.TrimPrefix(content, "```")
	content = strings.TrimSuffix(content, "```")
	content = strings.TrimSpace(content)

	var destination models.Destination
	if err := json.Unmarshal([]byte(content), &destination); err != nil {
		return nil, fmt.Errorf("error parsing destination JSON: %w", err)
	}

	destination.ID = fmt.Sprintf("dest-%d", time.Now().Unix())
	destination.Date = time.Now()

	return &destination, nil
}
