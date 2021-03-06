import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MobileCheck from '../../hooks/mobile-check.js'
import LinkButton from '../Buttons/LinkButton.js'
import { getMoviesFromPerson } from '../helpers/person.js'
import SortSelect from '../SortSelect.js'

const PersonFilms = ({ id }) => {
  const mobileCheck = MobileCheck()
  const [movies, setMovies] = useState([
    {
      cast: [],
    },
  ])
  const [moviesShown, setMoviesShown] = useState(10)
  const [sortBy, setSortBy] = useState('release_date')

  useEffect(() => {
    getMoviesFromPerson(id).then(data => setMovies(data))
  }, [id])

  const showMoreMovies = useCallback(() => {
    setMoviesShown(prevMoviesShown => prevMoviesShown + 10)
  }, [])

  const sortedMovies = useMemo(() => {
    return [...(movies.cast ?? [])]
      .sort((a, b) => {
        if (sortBy === 'release_date') {
          return new Date(b.release_date) - new Date(a.release_date)
        }
        if (sortBy === 'vote_average') {
          return b.vote_average - a.vote_average
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title)
        }
        return a
      })
      .splice(0, moviesShown)
  }, [sortBy, movies, moviesShown])

  return (
    <div>
      {movies && (
        <div className="person__films">
          <header className="person__films--header">
            <h3 className="person__films--title">Movies</h3>
            <SortSelect setSortBy={setSortBy} type="person" />
          </header>
          {sortedMovies?.map(movie => {
            if (!isNaN(movie.release_date)) {
              return false
            }

            return (
              <div key={movie?.id} className="person__films--single">
                <Link to={`/movie/${movie?.id}`}>
                  {!mobileCheck && (
                    <p className="person__films--single-star">
                      <>
                        <FaStar />
                        {movie?.vote_average > 0
                          ? movie?.vote_average?.toFixed(1)
                          : '?'}
                      </>
                    </p>
                  )}
                  <p className="person__films--single-title">
                    {movie?.title?.split(' ').splice(0, 5).join(' ')}
                    {movie?.title?.split(' ').splice(0, 3).length > 5 && '...'}
                    {movie?.character && <span>{movie.character}</span>}
                  </p>
                </Link>
                {movie?.release_date && !mobileCheck && (
                  <p className="person__film--single-date">
                    {' '}
                    {new Date(movie.release_date)
                      .toUTCString()
                      .split(' ')
                      .splice(0, 4)
                      .join(' ')}
                  </p>
                )}
              </div>
            )
          })}
          <div onClick={showMoreMovies}>
            <LinkButton
              text="Show More"
              icon={'plus'}
              buttonStyle={'yellow'}
              disabled={movies.length <= moviesShown}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonFilms
