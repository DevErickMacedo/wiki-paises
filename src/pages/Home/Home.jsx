import { useState, useEffect, useMemo } from "react";
import restCountriesService from "../../service/restcountriesapi/restCountries.service";
import CountryCard from "../../components/CountryCard/CountryCard";
import styles from "./Home.module.css";

const REGIONS = ["Americas", "Europe", "Asia", "Africa", "Oceania"];
const COUNTRIES_PER_PAGE = 20;

function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca todos os países uma vez
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await restCountriesService.listCountries();
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      } catch (err) {
        setError("Erro ao carregar países. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filtragem em tempo real (busca + região)
  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchName = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchRegion = region ? c.region === region : true;
      return matchName && matchRegion;
    });
  }, [countries, search, region]);

  // Reset paginação ao filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [search, region]);

  // Paginação
  const totalPages = Math.ceil(filtered.length / COUNTRIES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * COUNTRIES_PER_PAGE,
    currentPage * COUNTRIES_PER_PAGE
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>WikiPaíses</h1>
      </header>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="🔍 Procure o país que deseja..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.select}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Todos os continentes</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className={styles.feedback}>Carregando países...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={styles.grid}>
            {paginated.length > 0 ? (
              paginated.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))
            ) : (
              <p className={styles.feedback}>Nenhum país encontrado.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                ← Anterior
              </button>

              <span className={styles.pageInfo}>
                Página {currentPage} de {totalPages}
              </span>

              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                Próximo →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;