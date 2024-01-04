import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
    const [movie,setMovie] = useState([])

    useEffect(() => {
        let moviesList = [
            {
                id: 1,
                title: "Breaking-bad",
                release_date: "2011-03-07",
                runtime: 116,
                mpaa_rating: "R",
                description: "Some long description",
            },{
                id: 2,
                title: "Harry Potter",
                release_date: "204-01-03",
                runtime: 120,
                mpaa_rating: "PG-13",
                description: "Some long description",
            },
        ]

        setMovie(moviesList)
    },[])
    return (
        <>  
            <div className="text-center">
                    <h2>Movies</h2>
                    <hr/>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Movie</th>
                                <th>Release Date</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               movie.map((m)=>(
                                <tr key={m.id}>
                                    <td>
                                        <Link to={`/movies/${m.id}`}>
                                        {m.title}
                                        </Link>
                                    </td>
                                    <td>{m.release_date}</td>
                                    <td>{m.mpaa_rating}</td>
                            </tr> 
                               ))
                            }
                        </tbody>
                    </table>
            </div>
        </>
    )
}



export default Movies;