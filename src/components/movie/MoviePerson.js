import { FaUserSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAPI } from '../../context/api'
import Image from '../Image'

const MoviePerson = ({ person }) => {
  const { config } = useAPI()
  return (
    <Link
      to={`/person/${person.id}`}
      className={`movie-credits__item ${
        person.profile_path ? 'has-profile' : 'no-profile'
      }`}
    >
      <div className="movie-credits__item-image objFit">
        {person.profile_path ? (
          <Image
            className="movie-credits__image"
            src={`${config?.images?.base_url}${config?.images?.profile_sizes[1]}${person?.profile_path}`}
            alt={person.name}
          />
        ) : (
          <FaUserSlash />
        )}
      </div>
      <div className="movie-credits__info">
        {person?.name && (
          <h4 className="movie-credits__info--name">{person.name}</h4>
        )}
        {person?.character && (
          <p className="movie-credits__info--character opaque">
            {person.character}
          </p>
        )}
      </div>
    </Link>
  )
}

export default MoviePerson
