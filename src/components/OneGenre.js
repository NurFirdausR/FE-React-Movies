import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
const OneGenre = () => {
    const location = useLocation();
    const {genreName} = location.state

    const [movies,setMovies] = useState([])

    let {id} = useParams()

    useEffect(() => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const requestOptions = {
            method : "GET",
            headers : headers
        }

        fetch(`/movies/genres/${id}`,requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                console.log(data.message)
            }else{
                setMovies(data)
            }
        })
        .catch(err => {console.log(err)})
    },[id])
    if (movies.length > 0) {
        return (
          <div>
              <h2>Genre : {genreName}</h2>
              <hr/>
                <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr ky={m.id}>
                                    <td>
                            <Link
                                to={`/movies/${m.id}`}
                                >
                                      {m.title}
                                      
                            </Link>
                                      </td>
                                    <td>{m.release_date}</td>
                                    <td>{m.mpaa_rating}</td>
                            </tr>
                    ))}
                </tbody>
      
            </table>
          </div>
        )
        
    }else{
            return <>
            <h2>Genre : {genreName}</h2>
              <hr/>
  <p className='text-center'>No Movies in this genre</p>
            </>
    }
}

export default OneGenre