package cache

import (
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/lcontesini/proxima-viagem/internal/models"
)

type Cache struct {
	mu                 sync.RWMutex
	destination        *models.Destination
	lastUpdate         time.Time
	allDestinations    map[string]*models.Destination // Cache de TODOS os destinos por ID
	destinationsByDay  map[string]*models.Destination // Cache por data (YYYY-MM-DD)
	recentDestinations []*models.Destination          // Últimos 7 destinos para fallback rotativo
}

func New() *Cache {
	return &Cache{
		allDestinations:    make(map[string]*models.Destination),
		destinationsByDay:  make(map[string]*models.Destination),
		recentDestinations: make([]*models.Destination, 0, 7),
	}
}

func (c *Cache) Get() (*models.Destination, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	if c.destination == nil {
		return nil, false
	}

	// Usar sempre horário de São Paulo
	loc, err := time.LoadLocation("America/Sao_Paulo")
	if err != nil {
		// Fallback para UTC se não conseguir carregar o timezone
		loc = time.UTC
	}
	now := time.Now().In(loc)
	lastUpdateDate := c.lastUpdate.In(loc).Format("2006-01-02")
	todayDate := now.Format("2006-01-02")

	if lastUpdateDate != todayDate {
		return nil, false
	}

	return c.destination, true
}

func (c *Cache) Set(destination *models.Destination) {
	c.mu.Lock()
	defer c.mu.Unlock()

	// Usar sempre horário de São Paulo
	loc, err := time.LoadLocation("America/Sao_Paulo")
	if err != nil {
		// Fallback para UTC se não conseguir carregar o timezone
		loc = time.UTC
	}
	now := time.Now().In(loc)

	c.destination = destination
	c.lastUpdate = now

	// Armazenar no cache geral por ID
	c.allDestinations[destination.ID] = destination

	// Armazenar no cache por data
	dateKey := now.Format("2006-01-02")
	c.destinationsByDay[dateKey] = destination

	// Adicionar aos destinos recentes (rotação de 7 destinos)
	c.addToRecentDestinations(destination)
}

func (c *Cache) GetByID(id string) (*models.Destination, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	dest, found := c.allDestinations[id]
	return dest, found
}

func (c *Cache) GetByDate(date string) (*models.Destination, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	dest, found := c.destinationsByDay[date]
	return dest, found
}

func (c *Cache) GetAll() []*models.Destination {
	c.mu.RLock()
	defer c.mu.RUnlock()

	destinations := make([]*models.Destination, 0, len(c.allDestinations))
	for _, dest := range c.allDestinations {
		destinations = append(destinations, dest)
	}
	return destinations
}

// GetLatestDestination retorna o destino mais recente disponível (para fallback)
func (c *Cache) GetLatestDestination() (*models.Destination, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	// Se temos um destino do dia atual, retornar ele
	if c.destination != nil {
		return c.destination, true
	}

	// Se não temos destino do dia, procurar o mais recente no cache geral
	var latestDestination *models.Destination
	var latestTime time.Time

	for _, dest := range c.allDestinations {
		if dest.Date.After(latestTime) {
			latestTime = dest.Date
			latestDestination = dest
		}
	}

	return latestDestination, latestDestination != nil
}

// GetRecentDestinations retorna os últimos 7 destinos para monitoramento
func (c *Cache) GetRecentDestinations() []*models.Destination {
	c.mu.RLock()
	defer c.mu.RUnlock()

	// Retornar uma cópia para evitar problemas de concorrência
	recent := make([]*models.Destination, len(c.recentDestinations))
	copy(recent, c.recentDestinations)
	return recent
}

// addToRecentDestinations adiciona um destino aos recentes com rotação de 7
func (c *Cache) addToRecentDestinations(destination *models.Destination) {
	// Verificar se já existe e remover
	for i, dest := range c.recentDestinations {
		if dest.ID == destination.ID {
			// Remover da posição atual
			c.recentDestinations = append(c.recentDestinations[:i], c.recentDestinations[i+1:]...)
			break
		}
	}

	// Adicionar no início (mais recente)
	c.recentDestinations = append([]*models.Destination{destination}, c.recentDestinations...)

	// Manter apenas os últimos 7
	if len(c.recentDestinations) > 7 {
		c.recentDestinations = c.recentDestinations[:7]
	}
}

// GetFallbackDestination retorna um destino aleatório dos últimos 7 para fallback
func (c *Cache) GetFallbackDestination() (*models.Destination, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	// Se temos destinos recentes, escolher um aleatório
	if len(c.recentDestinations) > 0 {
		// Usar timestamp para pseudo-aleatoriedade
		index := int(time.Now().UnixNano()) % len(c.recentDestinations)
		return c.recentDestinations[index], true
	}

	// Se não tem destinos recentes, tentar pegar qualquer um do cache geral
	if len(c.allDestinations) > 0 {
		for _, dest := range c.allDestinations {
			return dest, true
		}
	}

	// Se não tem nenhum destino no cache, retornar destino estático de emergência
	return c.getStaticFallbackDestination(), true
}

// getStaticFallbackDestination retorna um destino estático aleatório para emergência
func (c *Cache) getStaticFallbackDestination() *models.Destination {
	// Lista de destinos estáticos para emergência
	emergencyDestinations := []*models.Destination{
		{
			ID:           "dest-emergency-gramado",
			Name:         "Gramado",
			Country:      "Brasil",
			Description:  "Gramado é uma charmosa cidade na Serra Gaúcha, conhecida por sua arquitetura europeia, chocolates artesanais e clima de montanha.",
			DetailedInfo: "Fundada por imigrantes alemães e italianos, Gramado preserva tradições europeias em sua arquitetura, gastronomia e cultura. A cidade é famosa por seus festivais, como o Natal Luz.",
			ImageURL:     "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
			Images: []string{
				"https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
				"https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
				"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
				"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
			},
			Tips: []string{
				"Reserve hotéis com antecedência durante o Natal Luz",
				"Experimente os chocolates artesanais nas fábricas locais",
				"Use roupas quentes no inverno",
				"Alugue um carro para explorar a região",
				"Evite fins de semana prolongados",
				"Visite as atrações pela manhã",
			},
			Attractions: []models.Attraction{
				{Name: "Rua Coberta", Description: "Centro de compras e gastronomia com arquitetura alpina", Duration: "2-3 horas", Price: "Grátis"},
				{Name: "Mini Mundo", Description: "Parque temático com miniaturas perfeitas", Duration: "2-3 horas", Price: "R$ 60-80"},
				{Name: "Lago Negro", Description: "Lago artificial cercado por bosque de pinheiros", Duration: "1-2 horas", Price: "Grátis"},
				{Name: "Snowland", Description: "Parque de neve indoor único no Brasil", Duration: "3-4 horas", Price: "R$ 150-200"},
				{Name: "Gramado Zoo", Description: "Zoológico moderno com mais de 1.500 animais", Duration: "3-4 horas", Price: "R$ 80-100"},
				{Name: "Le Jardin Parque de Lavanda", Description: "Lindo parque com campos de lavanda", Duration: "1-2 horas", Price: "R$ 40-60"},
			},
			BestTime: "Junho a agosto para curtir o frio e a atmosfera de inverno europeu",
			Budget: models.Budget{
				Low:    "R$ 200-300 por dia",
				Medium: "R$ 400-600 por dia",
				High:   "R$ 800-1200 por dia",
			},
			Transportation: "De avião: voe para Porto Alegre e alugue um carro. Na cidade, é possível caminhar pelo centro.",
			Accommodation:  "Centro, Planalto ou Carniel. Hotéis boutique, pousadas ou Airbnb em chalés.",
			LocalCuisine: []models.CuisineDish{
				{Name: "Fondue", Description: "Tradicional suíço com queijo ou chocolate, perfeito para noites frias"},
				{Name: "Galeto al primo canto", Description: "Frango assado na brasa, especialidade da região"},
				{Name: "Apfelstrudel", Description: "Torta de maçã alemã com canela, herança dos colonizadores"},
				{Name: "Sequência de café colonial", Description: "Variedade de pães, bolos e frios típicos"},
				{Name: "Vinho e espumante", Description: "Produção local da Serra Gaúcha, reconhecida mundialmente"},
			},
			Date: time.Now(),
		},
		{
			ID:           "dest-emergency-bonito",
			Name:         "Bonito",
			Country:      "Brasil",
			Description:  "Bonito é o destino de ecoturismo mais famoso do Brasil, conhecido por suas águas cristalinas, grutas e cachoeiras.",
			DetailedInfo: "Localizado no Mato Grosso do Sul, Bonito oferece experiências únicas de mergulho em rios de águas transparentes, flutuação e exploração de cavernas.",
			ImageURL:     "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
			Images: []string{
				"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
				"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
				"https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
				"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
			},
			Tips: []string{
				"Reserve passeios com antecedência",
				"Use protetor solar biodegradável",
				"Leve roupas de banho e tênis aquático",
				"Evite temporada de chuvas (dez-mar)",
				"Contrate guias credenciados",
				"Respeite o meio ambiente",
			},
			Attractions: []models.Attraction{
				{Name: "Rio da Prata", Description: "Flutuação em águas cristalinas com peixes coloridos", Duration: "4-5 horas", Price: "R$ 200-250"},
				{Name: "Gruta do Lago Azul", Description: "Caverna com lago subterrâneo de águas azuis", Duration: "2-3 horas", Price: "R$ 80-100"},
				{Name: "Buraco das Araras", Description: "Dolina com centenas de araras vermelhas", Duration: "1-2 horas", Price: "R$ 60-80"},
				{Name: "Aquário Natural", Description: "Mergulho com snorkel em águas transparentes", Duration: "3-4 horas", Price: "R$ 150-180"},
				{Name: "Cachoeira Boca da Onça", Description: "Cachoeira de 156m de altura", Duration: "4-5 horas", Price: "R$ 120-150"},
				{Name: "Balneário Municipal", Description: "Área de lazer com piscinas naturais", Duration: "2-3 horas", Price: "R$ 20-30"},
			},
			BestTime: "Abril a outubro (estação seca) para melhor visibilidade das águas",
			Budget: models.Budget{
				Low:    "R$ 300-400 por dia",
				Medium: "R$ 500-700 por dia",
				High:   "R$ 800-1200 por dia",
			},
			Transportation: "De avião: voe para Campo Grande e alugue um carro. Na cidade, use agências locais para passeios.",
			Accommodation:  "Centro da cidade ou pousadas próximas aos atrativos. Hotéis e pousadas ecológicas.",
			LocalCuisine: []models.CuisineDish{
				{Name: "Peixe pintado", Description: "Peixe típico da região preparado na brasa"},
				{Name: "Terrine de peixe", Description: "Patê de peixe servido com pão"},
				{Name: "Cachaça artesanal", Description: "Bebida típica da região"},
				{Name: "Doce de leite", Description: "Especialidade local"},
			},
			Date: time.Now(),
		},
		{
			ID:           "dest-emergency-jericoacoara",
			Name:         "Jericoacoara",
			Country:      "Brasil",
			Description:  "Jericoacoara é um paraíso no Ceará, famoso por suas dunas, lagoas e pôr do sol inesquecível.",
			DetailedInfo: "Vila de pescadores que se tornou destino internacional, Jeri preserva seu charme rústico com ruas de areia e energia solar.",
			ImageURL:     "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
			Images: []string{
				"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
				"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
				"https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
				"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
			},
			Tips: []string{
				"Leve dinheiro em espécie",
				"Use roupas leves e protetor solar",
				"Alugue buggy para explorar",
				"Evite temporada de chuvas (jan-mar)",
				"Reserve pousadas com antecedência",
				"Experimente o pôr do sol na Duna do Pôr do Sol",
			},
			Attractions: []models.Attraction{
				{Name: "Duna do Pôr do Sol", Description: "Vista panorâmica do pôr do sol mais famoso do Brasil", Duration: "2-3 horas", Price: "Grátis"},
				{Name: "Lagoa do Paraíso", Description: "Lagoa de águas cristalinas cercada por dunas", Duration: "4-5 horas", Price: "R$ 80-120"},
				{Name: "Pedra Furada", Description: "Formação rochosa natural com buraco", Duration: "2-3 horas", Price: "Grátis"},
				{Name: "Lagoa Azul", Description: "Lagoa com águas azuis em meio às dunas", Duration: "3-4 horas", Price: "R$ 60-80"},
				{Name: "Praia de Jericoacoara", Description: "Praia principal com ondas para surf", Duration: "2-4 horas", Price: "Grátis"},
				{Name: "Serrote", Description: "Mirante com vista 360° da vila", Duration: "1-2 horas", Price: "Grátis"},
			},
			BestTime: "Julho a dezembro (estação seca) para melhor clima e águas das lagoas",
			Budget: models.Budget{
				Low:    "R$ 200-300 por dia",
				Medium: "R$ 400-600 por dia",
				High:   "R$ 700-1000 por dia",
			},
			Transportation: "De avião: voe para Fortaleza e pegue transfer ou alugue carro. Na vila, caminhe ou use buggy.",
			Accommodation:  "Pousadas na vila ou próximas à praia. Hospedagem rústica e charmosa.",
			LocalCuisine: []models.CuisineDish{
				{Name: "Lagosta", Description: "Especialidade local preparada de várias formas"},
				{Name: "Peixe frito", Description: "Peixe fresco frito na hora"},
				{Name: "Açaí", Description: "Açaí cremoso servido com frutas"},
				{Name: "Cajuína", Description: "Bebida refrescante feita de caju"},
			},
			Date: time.Now(),
		},
	}

	// Escolher um destino aleatório usando timestamp
	index := int(time.Now().UnixNano()) % len(emergencyDestinations)
	selectedDestination := emergencyDestinations[index]

	// Gerar ID único para evitar duplicatas no histórico do frontend
	selectedDestination.ID = fmt.Sprintf("dest-emergency-%s-%d",
		strings.ToLower(strings.ReplaceAll(selectedDestination.Name, " ", "-")),
		time.Now().Unix())

	return selectedDestination
}

// getLatestDestinationUnsafe - versão sem lock para uso interno
func (c *Cache) getLatestDestinationUnsafe() (*models.Destination, bool) {
	var latestDestination *models.Destination
	var latestTime time.Time

	for _, dest := range c.allDestinations {
		if dest.Date.After(latestTime) {
			latestTime = dest.Date
			latestDestination = dest
		}
	}

	return latestDestination, latestDestination != nil
}

func (c *Cache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.destination = nil
	c.lastUpdate = time.Time{}
	c.allDestinations = make(map[string]*models.Destination)
	c.destinationsByDay = make(map[string]*models.Destination)
	c.recentDestinations = make([]*models.Destination, 0, 7)
}
