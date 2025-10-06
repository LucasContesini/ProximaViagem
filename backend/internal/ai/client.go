package ai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
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
			Timeout: 30 * time.Second,
		},
	}
}

func (c *Client) GetDailyDestination() (*models.Destination, error) {
	prompt := `Sugira um destino turístico incrível no BRASIL para viajar. Responda APENAS em formato JSON válido, sem texto adicional, seguindo exatamente esta estrutura:
{
  "name": "Nome da cidade",
  "country": "Brasil",
  "description": "Descrição atraente e envolvente do destino em 3-4 frases",
  "detailedInfo": "Informação detalhada sobre o destino, sua história, cultura, características únicas e o que torna esse lugar especial. Mínimo 4-5 frases bem elaboradas.",
  "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
  "images": [
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
    "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800"
  ],
  
  IMPORTANTE SOBRE IMAGENS: Use APENAS URLs de fotos REAIS do Unsplash. 
  Exemplos de IDs válidos de fotos do Brasil:
  - photo-1483729558449-99ef09a8c325 (Rio de Janeiro)
  - photo-1516306580123-e6e52b1b7b5f (Praia brasileira)
  - photo-1488646953014-85cb44e25828 (Cristo Redentor)
  - photo-1473496169904-658ba7c44d8a (Natureza Brasil)
  - photo-1516259762381-22954d7d3ad2 (Praia)
  - photo-1483729558449-99ef09a8c325 (Cidade)
  - photo-1518709268805-4e9042af9f23 (Paisagem)
  - photo-1469854523086-cc02fe5d8800 (Natureza)
  
  Escolha 4 IDs diferentes da lista acima para cada destino.
  "tips": [
    "Dica detalhada 1 com informações práticas e úteis",
    "Dica detalhada 2 sobre segurança ou economia",
    "Dica detalhada 3 sobre cultura local",
    "Dica detalhada 4 sobre transporte ou locomoção",
    "Dica detalhada 5 sobre o que evitar",
    "Dica detalhada 6 sobre melhores horários para visitar"
  ],
  "attractions": [
    {
      "name": "Nome da Atração 1",
      "description": "Descrição detalhada da atração, o que fazer lá, por que visitar",
      "duration": "Tempo recomendado de visita",
      "price": "Faixa de preço (Grátis/R$ 10-50/R$ 50-100/etc)"
    },
    {
      "name": "Nome da Atração 2",
      "description": "Descrição detalhada da atração",
      "duration": "Tempo recomendado",
      "price": "Faixa de preço"
    },
    {
      "name": "Nome da Atração 3",
      "description": "Descrição detalhada",
      "duration": "Tempo recomendado",
      "price": "Faixa de preço"
    },
    {
      "name": "Nome da Atração 4",
      "description": "Descrição detalhada",
      "duration": "Tempo recomendado",
      "price": "Faixa de preço"
    },
    {
      "name": "Nome da Atração 5",
      "description": "Descrição detalhada",
      "duration": "Tempo recomendado",
      "price": "Faixa de preço"
    },
    {
      "name": "Nome da Atração 6",
      "description": "Descrição detalhada",
      "duration": "Tempo recomendado",
      "price": "Faixa de preço"
    }
  ],
  "bestTime": "Melhor época para visitar com detalhes sobre clima e eventos",
  "budget": {
    "low": "Orçamento econômico: R$ X-Y por dia (descrição do que inclui)",
    "medium": "Orçamento médio: R$ X-Y por dia (descrição do que inclui)",
    "high": "Orçamento confortável: R$ X-Y por dia (descrição do que inclui)"
  },
  "transportation": "Informações detalhadas sobre como chegar e se locomover no destino, incluindo opções de transporte público, táxi, uber, aluguel de carro, etc.",
  "accommodation": "Sugestões de onde se hospedar, bairros recomendados, tipos de acomodação disponíveis (hotéis, pousadas, hostels, airbnb) com faixas de preço",
  "localCuisine": [
    {
      "name": "Nome do Prato Típico 1",
      "description": "Descrição detalhada do prato, ingredientes principais e por que experimentar",
      "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
    },
    {
      "name": "Nome do Prato Típico 2",
      "description": "Descrição detalhada do prato",
      "imageUrl": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
    },
    {
      "name": "Nome do Prato Típico 3",
      "description": "Descrição detalhada do prato",
      "imageUrl": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
    },
    {
      "name": "Bebida Típica",
      "description": "Descrição da bebida típica",
      "imageUrl": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"
    }
  ]
}

IMPORTANTE: 
- Escolha APENAS destinos turísticos brasileiros variados (cidades históricas, praias, montanhas, parques nacionais, capitais, cidades do interior)
- Para as imagens do destino, use APENAS estas URLs válidas do Unsplash (escolha 4 diferentes aleatoriamente):
  * https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800
  * https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800
  * https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800
  * https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800
  * https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800
  * https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800
  * https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800
  * https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800
- Para as imagens de COMIDA (localCuisine), use APENAS estas URLs válidas:
  * https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400 (comida geral)
  * https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400 (prato)
  * https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400 (pizza/massa)
  * https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400 (hamburguer)
  * https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400 (comida)
  * https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400 (salada/bowl)
  * https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400 (bebida)
  * https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400 (sobremesa)
- NÃO invente IDs de fotos, use APENAS as URLs listadas acima
- Seja MUITO detalhado e informativo em todas as descrições
- Forneça informações práticas e úteis que realmente ajudem o viajante
- Inclua pelo menos 6 atrações diferentes e bem descritas
- Dê dicas específicas e relevantes para aquele destino
- Seja criativo e escolha destinos diversos do Brasil
- Para localCuisine, forneça 4-5 pratos/bebidas típicas com nome, descrição detalhada e imageUrl`

	reqBody := models.AIRequest{
		Model: "llama-3.3-70b-versatile",
		Messages: []models.AIMessage{
			{
				Role:    "system",
				Content: "Você é um especialista em turismo brasileiro com conhecimento profundo sobre destinos, cultura, gastronomia e dicas práticas de viagem. Sempre responda em JSON válido com informações detalhadas e úteis.",
			},
			{
				Role:    "user",
				Content: prompt,
			},
		},
		MaxTokens: 3000,
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
