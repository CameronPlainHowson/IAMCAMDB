import Film from './../Film'

const SearchResutls = ({ results, config, filmList }) => {
  return (
    <section className="search-results">
      <ul className="search-results__list">
        {results?.map(film => {
          const isInList = filmList?.includes(film.id)

          if (!film.poster_path) {
            return false
          }
          return (
            <li className="search-results__list__item" key={film?.id}>
              <Film film={film} config={config} isInList={isInList} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SearchResutls
