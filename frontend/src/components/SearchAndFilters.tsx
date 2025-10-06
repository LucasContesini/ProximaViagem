import { useState } from 'react';
import '../styles/SearchAndFilters.css';

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  continent?: string;
  budget?: string;
  season?: string;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    onFilter({});
    onSearch('');
  };

  return (
    <div className="search-filters-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="🔍 Buscar destino, país..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      <button 
        className="filters-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🎯 Filtros {(filters.continent || filters.budget || filters.season) && '(ativos)'}
      </button>

      {isOpen && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Continente:</label>
            <select 
              value={filters.continent || ''}
              onChange={(e) => handleFilterChange('continent', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="América do Sul">América do Sul</option>
              <option value="América do Norte">América do Norte</option>
              <option value="Europa">Europa</option>
              <option value="Ásia">Ásia</option>
              <option value="África">África</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Orçamento:</label>
            <select 
              value={filters.budget || ''}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="low">Econômico</option>
              <option value="medium">Médio</option>
              <option value="high">Alto</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Melhor Época:</label>
            <select 
              value={filters.season || ''}
              onChange={(e) => handleFilterChange('season', e.target.value)}
            >
              <option value="">Todas</option>
              <option value="verão">Verão</option>
              <option value="inverno">Inverno</option>
              <option value="primavera">Primavera</option>
              <option value="outono">Outono</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters">
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
