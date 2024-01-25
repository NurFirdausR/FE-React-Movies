import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import Swal from 'sweetalert2'
const ManageCatalogue = () => {
  const [movies,setMovies] = useState([])
  const {jwtToken} =  useOutletContext()
  const navigate = useNavigate();

  useEffect(() => {
    console.log(jwtToken)
    if (jwtToken ===  "") {
        navigate("/login")
        return
      }
      const headers =  new Headers();
      headers.append("Content-type","aplication/json")
      headers.append("Authorization","Bearer " + jwtToken)

      const requestOptions = {
          method: "GET",
          headers: headers
      }

      fetch(`${process.env.REACT_APP_BACKEND}/admin/movies`, requestOptions)
      .then((response)=>response.json())
      .then((data)=> {
          setMovies(data)
      })
      .catch(err => {
          console.log(err)
      })
  },[jwtToken, navigate])
  const confirmDelete = (e,id) => {
    e.preventDefault(); // Corrected
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            const headers =  new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Authorization","Bearer " + jwtToken)
      
            const requestOptions = {
                method: "DELETE",
                headers: headers
            }
            fetch(`${process.env.REACT_APP_BACKEND}/admin/movies/delete/${id}`, requestOptions)
            .then((response)=>response.json())
            .then((data) => {
                setMovies(movies.filter(movie => movie.id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: data.Message, // Assuming 'data.Message' contains the message you want to show
                    icon: "success"
                });
            })
            .catch(err => {
                console.error('There was a problem with the fetch operation:', err);
                Swal.fire({
                  title: 'Error!',
                  text: 'There was an error deleting the item.',
                  icon: 'error',
                });
            })
        }
      });
  }
  return (
    <>  
        <div className="text-center">
                <h2>Manage Catalog</h2>
                <hr/>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Release Date</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           movies.map((m)=>(
                            <tr key={m.id}>
                                <td>
                                    <Link to={`/admin/movie/${m.id}`}>
                                    {m.title}
                                    </Link>
                                </td>
                                <td>{m.release_date}</td>
                                <td>{m.mpaa_rating}</td>
                                <td><a href="!#" className='btn  btn-md btn-danger' onClick={(e) => confirmDelete(e,m.id)}>Delete</a></td>
                        </tr> 
                           ))
                        }
                    </tbody>
                </table>
        </div>
    </>
)
}

export default ManageCatalogue