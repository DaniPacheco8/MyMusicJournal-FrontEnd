import styles from './ConcertsFilter.module.scss';

  export const ConcertsFilter = ({
    filterYear,
    onYearChange,
    filterCity,
    onCityChange,
    availableYears = []
  }) => {
    const years = availableYears.length > 0
      ? availableYears.sort((a, b) => b - a)
      : [];

    return (
      <div className={styles.filterContainer}>
        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}>
            <label htmlFor="year-filter" className={styles.label}>
              Filter by Year
            </label>
            <select
              id="year-filter"
              value={filterYear}
              onChange={(e) => onYearChange(e.target.value)}
              className={styles.select}
              aria-label="Filter concerts by year"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="city-filter" className={styles.label}>
              Filter by City
            </label>
            <input
              id="city-filter"
              type="text"
              value={filterCity}
              onChange={(e) => onCityChange(e.target.value)}
              placeholder="Search city..."
              className={styles.input}
              aria-label="Filter concerts by city"
            />
          </div>
        </div>
      </div>
    );
  };
