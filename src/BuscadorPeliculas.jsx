import { useState } from "react"

export const BuscadorPeliculas = () => {

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '5e699eab7f1c41be1f13166ce729595b'

  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setPeliculas] = useState([])

  const handleInputChange = (e) =>{
    setBusqueda(e.target.value)
  }
  
  

  const fetchPeliculas = async () =>{
    try{
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
      const data = await response.json()
      setPeliculas(data.results)
    }catch(error){
      console.error('Ha ocurrido el siguiente error: ', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (busqueda.length > 0) {fetchPeliculas()
    }else{
    window.alert(`La pelicula ${busqueda} no se encuentra en la grilla.`)}
  }
  /*useEffect(() => {
    fetchPeliculas()
  }, [])
  */

  return (
    <div className="container">
      <h1 className="title">Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Escribí una película." 
        value={busqueda}
        onChange={handleInputChange}          
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card"> 
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
    </div>

    </div>
  )
}
