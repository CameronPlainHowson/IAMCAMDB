export async function getPopularTvShows() {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  )
  const data = await response.json()
  return data.results
}
export async function getTVShowById(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )
  const data = await response.json()
  return data
}

export async function getTVShowImages(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
  )
  const data = await response.json()
  return data
}

export async function getTVShowCredits(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
  )
  const data = await response.json()
  return data
}

export async function getSimilarTvShows(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  )
  const data = await response.json()
  return data.results
}