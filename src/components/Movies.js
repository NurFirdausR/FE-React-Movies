import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
    const [movie,setMovie] = useState([])

    useEffect(() => {
        const headers =  new Headers();
        headers.append("Content-type","aplication/json")

        const requestOptions = {
            method: "GET",
            headers: headers
        }

        fetch(`http://localhost:8080/movies`, requestOptions)
        .then((response)=>response.json())
        .then((data)=> {
            setMovie(data)
        })
        .catch(err => {
            console.log(err)
        })
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