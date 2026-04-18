import { useNavigate } from "react-router-dom";
import styles from "./CountryCard.module.css";

const REGION_COLORS = {
  Africa: "#f59e0b",
  Americas: "#10b981",
  Asia: "#ef4444",
  Europe: "#3b82f6",
  Oceania: "#8b5cf6",
  Antarctic: "#6b7280",
};

function CountryCard({ country }) {
  const navigate = useNavigate();

  const formatPopulation = (pop) =>
    new Intl.NumberFormat("pt-BR").format(pop);

  const badgeColor = REGION_COLORS[country.region] || "#6b7280";

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/country/${country.cca3}`)}
    >
      <img
        className={styles.flag}
        src={country.flags.svg}
        alt={`Bandeira de ${country.name.common}`}
      />
      <div className={styles.info}>
        <h2 className={styles.name}>{country.name.common}</h2>

        <p className={styles.detail}>
          <span className={styles.label}>Capital:</span>{" "}
          {country.capital?.[0] ?? "N/A"}
        </p>

        <p className={styles.detail}>
          <span className={styles.label}>População:</span>{" "}
          {formatPopulation(country.population)}
        </p>

        <span
          className={styles.badge}
          style={{ backgroundColor: badgeColor }}
        >
          {country.region}
        </span>
      </div>
    </div>
  );
}

export default CountryCard;