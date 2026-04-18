import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import restCountriesService from "../../service/restcountriesapi/restCountries.service";
import styles from "./CountryDetail.module.css";

function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await restCountriesService.getCountriesByCode(code);
        setCountry(data);
      } catch (err) {
        setError("País não encontrado.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) return <p className={styles.feedback}>Carregando...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!country) return null;

  // Formatações
  const formatPopulation = (pop) =>
    new Intl.NumberFormat("pt-BR").format(pop);

  const formatArea = (area) =>
    new Intl.NumberFormat("pt-BR").format(area) + " km²";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.entries(country.currencies)
        .map(([code, cur]) => `${cur.name} (${code} — ${cur.symbol ?? "?"})`)
        .join(", ")
    : "N/A";

  // Seção descritiva mockada
  const description = {
    title: `Saiba+ sobre ${country.name.common}`,
    text: `${country.name.common} é um país localizado em ${country.region}
      ${country.subregion ? `, mais especificamente na sub-região ${country.subregion}` : ""}.
      Com uma população de ${formatPopulation(country.population)} habitantes e uma área de
      ${formatArea(country.area)}, é um território com rica diversidade cultural.
      O país adota como idioma(s) oficial(is): ${languages}, e utiliza como moeda: ${currencies}.`,
  };

  const infoBlocks = [
    { label: "Capital", value: country.capital?.[0] ?? "N/A" },
    { label: "Continente", value: country.region },
    { label: "Sub-região", value: country.subregion ?? "N/A" },
    { label: "Área", value: formatArea(country.area) },
    { label: "População", value: formatPopulation(country.population) },
    { label: "Idiomas", value: languages },
    { label: "Moeda", value: currencies },
    { label: "Código (cca3)", value: country.cca3 },
  ];

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate("/")}>
        ← Voltar para a lista
      </button>

      {/* Bandeira em destaque */}
      <div className={styles.flagWrapper}>
        <img
          className={styles.flag}
          src={country.flags.svg}
          alt={`Bandeira de ${country.name.common}`}
        />
      </div>

      {/* Nome oficial e comum */}
      <div className={styles.names}>
        <h1 className={styles.commonName}>{country.name.common}</h1>
        <p className={styles.officialName}>{country.name.official}</p>
      </div>

      {/* Blocos de informação */}
      <div className={styles.blocksGrid}>
        {infoBlocks.map((block) => (
          <div key={block.label} className={styles.block}>
            <span className={styles.blockLabel}>{block.label}</span>
            <span className={styles.blockValue}>{block.value}</span>
          </div>
        ))}
      </div>

      {/* Seção descritiva */}
      <div className={styles.description}>
        <h2 className={styles.descTitle}>{description.title}</h2>
        <p className={styles.descText}>{description.text}</p>
      </div>
    </div>
  );
}

export default CountryDetail;