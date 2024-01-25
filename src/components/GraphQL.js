import React, { useEffect, useState } from 'react'
import Input from "./form/Input";
import { Link } from 'react-router-dom';
const GraphQL = () => {

  const [movies,setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [fullList,setFullList] = useState([]);

  const performSearch = () => {
    const payload = `
    {
      search(titleContains: "${searchTerm}") {
        id
        title
        runtime
        release_date
        mpaa_rating
      }
    }`;

    const headers = new Headers()

    headers.append("Content-Type","application/grapql");

    const requestOptions = {
      method : "POST",
      headers: headers,
      body: payload,
    }

    fetch(`${process.env.REACT_APP_BACKEND}/graph`, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      let theList = Object.values(response.data.search)
      setMovies(theList)
    })
    .catch(err => console.log(err))
  }

  const handleChange = (e) =>{
    e.preventDefault()
    let value = e.target.value;
    setSearchTerm(value)

    if (value.length > 2) {
      performSearch();
    }else{
      setMovies(fullList)
    }
  }

  useEffect(() => {
    const payload = `
    {
      listdata {
        id
        title
        runtime
        release_date
        mpaa_rating
      }
    }`;

    const headers = new Headers()

    headers.append("Content-Type","aplication/grapql")

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: payload,
    }

    fetch(`${process.env.REACT_APP_BACKEND}/graph`,requestOptions)
    .then((response) => response.json())
    .then((response) => {
      let theList = Object.values(response.data.listdata)
      setMovies(theList)
      setFullList(theList)
    })
    .catch(err => console.log(err))

  },[])
  return (
    <div className='container ' >
      <h2>GraphQL</h2>
      <hr/>

      <form action="" onSubmit={handleChange}>
        <Input 
        title={"Search"}
        type={"search"}
        name={"search"}
        className={"form-control"}
        value={searchTerm}
        onChange={handleChange}/>
      </form>
      {movies ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Release Date</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id}>
                    <td>
                      <Link to={`/movies/${m.id}`} >
                        {m.title}
                      </Link>
                    </td>
                    <td>{new Date(m.release_date).toLocaleDateString()}</td>
                    <td>{m.mpaa_rating}</td>
              </tr>
              ))}
            </tbody>
          </table>
      ) : (
        <p className="text-center">No Movies Yet</p>
      )}
    </div>
  )
}

export default GraphQL