package cache

import (
	"sync"
	"time"

	"github.com/lcontesini/proxima-viagem/internal/models"
)

type Cache struct {
	mu                sync.RWMutex
	destination       *models.Destination
	lastUpdate        time.Time
	allDestinations   map[string]*models.Destination // Cache de TODOS os destinos por ID
	destinationsByDay map[string]*models.Destination // Cache por data (YYYY-MM-DD)
	recentDestinations []*models.Destination         // Últimos 7 destinos para fallback
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
	loc, _ := time.LoadLocation("America/Sao_Paulo")
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
	loc, _ := time.LoadLocation("America/Sao_Paulo")
	now := time.Now().In(loc)

	c.destination = destination
	c.lastUpdate = now

	// Armazenar no cache geral por ID
	c.allDestinations[destination.ID] = destination

	// Armazenar no cache por data
	dateKey := now.Format("2006-01-02")
	c.destinationsByDay[dateKey] = destination
	
	// Adicionar aos destinos recentes (máximo 7)
	c.addToRecentDestinations(destination)
}

func (c *Cache) addToRecentDestinations(destination *models.Destination) {
	// Verificar se já existe
	for i, dest := range c.recentDestinations {
		if dest.ID == destination.ID {
			// Remover da posição atual
			c.recentDestinations = append(c.recentDestinations[:i], c.recentDestinations[i+1:]...)
			break
		}
	}
	
	// Adicionar no início
	c.recentDestinations = append([]*models.Destination{destination}, c.recentDestinations...)
	
	// Manter apenas os últimos 7
	if len(c.recentDestinations) > 7 {
		c.recentDestinations = c.recentDestinations[:7]
	}
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

// GetRecentDestinations retorna os últimos 7 destinos para fallback
func (c *Cache) GetRecentDestinations() []*models.Destination {
	c.mu.RLock()
	defer c.mu.RUnlock()
	
	// Retornar uma cópia para evitar problemas de concorrência
	recent := make([]*models.Destination, len(c.recentDestinations))
	copy(recent, c.recentDestinations)
	return recent
}

// GetRandomRecentDestination retorna um destino aleatório dos últimos 7
func (c *Cache) GetRandomRecentDestination() (*models.Destination, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	
	if len(c.recentDestinations) == 0 {
		return nil, false
	}
	
	// Usar timestamp para pseudo-aleatoriedade
	index := int(time.Now().UnixNano()) % len(c.recentDestinations)
	return c.recentDestinations[index], true
}

func (c *Cache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.destination = nil
	c.lastUpdate = time.Time{}
	c.allDestinations = make(map[string]*models.Destination)
	c.destinationsByDay = make(map[string]*models.Destination)
}
