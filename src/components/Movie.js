import { useEffect, useState } from "react";
import {  useParams ,useNavigate,useLocation} from "react-router-dom";
import { motion,AnimatePresence } from "framer-motion"

const Movie = () => {
    const [movie,setMovie] = useState({});
    const [movies,setMovies] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    
    let { id } = useParams();
    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type","application/json")


        const requestOptions = {
            method: "GET",
            headers: headers
        }
        fetch(`http://localhost:8080/movies/${id}`,requestOptions)
        .then((response)=>  response.json())
        .then((data)=> {
            setMovie(data)
            
        })
        .catch(err => {
            console.log(err)
        })

        

        if (movie.genres) {
                movie.genres = Object.values(movie.genres)
        }else{
            movie.genres = [];
        }
        

        fetch(`http://localhost:8080/movies`, requestOptions)
        .then((response)=>response.json())
        .then((data)=> {
            setMovies(data)
        })
        .catch(err => {
            console.log(err)
        })
       
    },[id,movie])

    const currentMovieIndex = movies.findIndex(m => m.id === parseInt(movie.id, 10));

  const goToNextMovie = () => {
    if (currentMovieIndex < movies.length - 1) {
      const nextMovie = movies[currentMovieIndex + 1];
      navigate(`/movies/${nextMovie.id}`);
    }
  };

  const goToPreviousMovie = () => {
    if (currentMovieIndex > 0) {
      const previousMovie = movies[currentMovieIndex - 1];
      navigate(`/movies/${previousMovie.id}`);

    }
  };

  if (currentMovieIndex === -1) return <div>Loading...</div>;
  return (
      
      <>
        <div className="row">
        <div className="col-6 text-start">
            {currentMovieIndex !== 0 &&
            <button onClick={goToPreviousMovie}  className="btn btn-md btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg></button> }
            
        </div>
        <div className="col-6 text-end">
            {currentMovieIndex !== movies.length - 1 && 
                        <button onClick={goToNextMovie} className="btn btn-md btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                        </svg></button>}

        </div>
        </div>
            <AnimatePresence mode='wait'>
             <div className="text-center" >
             <motion.div
             key={location.key} 
                initial={{ opacity: 0, x: 100 }} // Initial animation properties
                animate={{ opacity: 1, x: 5 }} // Animate properties
                exit={{ opacity: 0, x: -100 }} // Exit animation properties
                transition={{ ease: "easeOut", duration: 0.7 }} // Transition properties
               
            >
                    <h2>Movie {movie.title}</h2>
                    <small><em>{movie.release_date}, {movie.runtime} minutes, Rated {movie.mpaa_rating}</em></small>
                    <br/>
                    {movie.genres && movie.genres.map((g) => (
                        <span key={g.id} className="badge bg-secondary m-2">{g.genre}</span>
                    ))}
            </motion.div>

                    <hr/>
            <motion.div
                key={location.pathname} // Ensure each page has a unique key
                initial={{ opacity: 0, x: -100 }} // Initial animation properties
                animate={{ opacity: 1, x: 0 }} // Animate properties
                exit={{ opacity: 0, x: 100 }} // Exit animation properties
                transition={{ ease: "easeOut", duration: 1 }} // Transition properties
               
            >
                    {movie.image !== "" && 
                    <div  className="mb-3">
                        <img className="w-25 h-25" srcSet={`http://image.tmdb.org/t/p/w200/${movie.image}`} alt="poster" />
                    </div>
                    }
            </motion.div>
                    <div className="row">
                        <div className="container w-75">
                        <p >{movie.description}</p>
                        </div>
                    </div>
            </div>
        </AnimatePresence>

                 
        </>
    )
}



export default Movie;