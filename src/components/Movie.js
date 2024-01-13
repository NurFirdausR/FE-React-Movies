import { useEffect, useState } from "react";
import { Link, useParams ,useLocation} from "react-router-dom";
import { motion,AnimatePresence } from "framer-motion"
let movieCount = null;
const Movie = () => {
    const [movie,setMovie] = useState({});
    const [movies,setMovies] = useState([]);
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
        movieCount = movies.length;
    },[id,location,movie,movies])
    function changePage() {
        if (movieCount === movie.id) {
            return <div className="text-start">
            <Link to={`/movies/${parseInt(id)-1}`} className="btn btn-md btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg></Link>
        </div>;
        } 
         if ( movieCount > movie.id && movie.id-1 !== 0) {

            return <div className="row justify-content-evenly">
                <div className="text-start col-6">
                <Link to={`/movies/${parseInt(id)-1}`} className="btn btn-md btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg></Link>
                </div>
                <div className="text-end col-6">
                <Link to={`/movies/${parseInt(id)+1}`} className="btn btn-md btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></Link>
                </div>
          </div>
        
           
        } 
         if (   movie.id === 1 ) {
            return <div className="text-end">
            <Link to={`/movies/${parseInt(id)+1}`} className="btn btn-md btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
    </svg></Link>
        </div>;
        } 
    }
    return (
        <>
            {changePage()}
            <AnimatePresence mode='wait'>
            <motion.div
                key={location.pathname} // Ensure each page has a unique key
                initial={{ opacity: 0, x: -100 }} // Initial animation properties
                animate={{ opacity: 1, x: 0 }} // Animate properties
                exit={{ opacity: 0, x: 100 }} // Exit animation properties
                transition={{ ease: "easeOut", duration: 1 }} // Transition properties
               
            >
             <div className="text-center" >
                    <h2>Movie {movie.title}</h2>
                    <small><em>{movie.release_date}, {movie.runtime} minutes, Rated {movie.mpaa_rating}</em></small>
                    <br/>
                    {movie.genres && movie.genres.map((g) => (
                        <span key={g.id} className="badge bg-secondary m-2">{g.genre}</span>
                    ))}
                    <hr/>
                    {movie.image !== "" && 
                    <div  className="mb-3">
                        <img className="w-25 h-25" srcSet={`http://image.tmdb.org/t/p/w200/${movie.image}`} alt="poster" />
                    </div>
                    }
                    <div className="row">
                        <div className="container w-75">
                        <p >{movie.description}</p>
                        </div>
                    </div>
            </div>
            </motion.div>
        </AnimatePresence>

                 
        </>
    )
}



export default Movie;