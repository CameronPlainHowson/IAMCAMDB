import { useRef } from 'react'
import { FaMinus, FaPlus, FaQuestionCircle, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAPI } from '../context/api.js'
import useOnScreen from '../hooks/on-screen.js'
import {
  addFilm,
  addShow,
  removeFilm,
  removeShow,
} from './helpers/localStorage.js'
import Image from './Image.js'

const Film = ({ film, isInList, type }) => {
  const ref = useRef()
  const isVisible = useOnScreen(ref)
  const { config } = useAPI()

  return (
    <div className="objFit film__container" ref={ref}>
      {isVisible && (
        <div
          className="objFit film__container"
          aria-label={film.original_title}
        >
          <Link to={`/movie/${film.id}`} className="film__link">
            <div className="film__image">
              {film.poster_path ? (
                <Image
                  src={`${config?.images?.base_url}${config?.images?.profile_sizes[1]}${film?.poster_path}`}
                  alt={`${film.title}`}
                  loading="lazy"
                />
              ) : (
                <div className="film__image--placeholder">
                  <FaQuestionCircle />
                  <h5>{film.title}</h5>
                </div>
              )}
            </div>
          </Link>
          <div className="film__details">
            {film.vote_average > 0 && film.vote_average.toFixed(1) !== 0 && (
              <div className="film__details--rating">
                <FaStar />
                {film?.vote_average.toFixed(1)}
              </div>
            )}
            <div
              className="film__details--list"
              onClick={() => {
                type === 'movie'
                  ? isInList
                    ? removeFilm(film.id)
                    : addFilm(film.id)
                  : isInList
                  ? removeShow(film.id)
                  : addShow(film.id)
              }}
            >
              {isInList ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Film
