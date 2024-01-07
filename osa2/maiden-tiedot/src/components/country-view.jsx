export default function CountryView({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt={`The flag of ${country.name.common}`} />
      </div>
    </div>
  )
}