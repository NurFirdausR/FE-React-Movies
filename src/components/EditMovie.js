import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Input from './form/Input';
import Select from './form/Select';
import TextArea from './form/TextArea';
import CheckBox from './form/CheckBox';
import Swal from 'sweetalert2';


const EditMovie = () => {
  const navigate = useNavigate();
  const {jwtToken} = useOutletContext();

  const [error,setError] =  useState(null)
  const [errors,setErrors] = useState([])

  const mpaaOptions = [
    { id : "G", value: "G"},
    { id : "PG", value: "PG"},
    { id : "PG13", value: "PG13"},
    { id : "NC12", value: "NC12"},
    { id : "18A", value: "18A"},
  ]

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  }
  const [movie,setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    genres: [],
    genres_array: [Array(13).fill(false)]
  })

  // get id from url
  let {id} = useParams()
  if (id === undefined) {
    id = 0
  }

  useEffect(() => {
    if (jwtToken === "") {
        navigate("/login")
        return
    }
    if (id === 0) {
        //add movie
        setMovie({
          id: 0,
          title: "",
          release_date: "",
          runtime: "",
          mpaa_rating: "",
          description: "",
          genres: [],
          genres_array: [Array(13).fill(false)]
        })
        var headers = new Headers();
        headers.append("Content-Type","application/json")

        const requestOptions = {
          method: "GET",
          headers: headers
        }

        fetch(`/genres`,requestOptions)
        .then((response)=> response.json())
        .then((data) => {
          const checks = [];
          data.forEach(g => {
              checks.push({id: g.id,checked: false,genre: g.genre})
          });
          setMovie(m => ({
            ...m,
            genres: checks,
            genres_array: []
          }))
        }).catch(err => {
          console.log(err)
        })
    }else{
        //edit movie

    }


  }, [id,jwtToken,navigate])
  const handleSubmit =  (e) => {
    e.preventDefault()
    let errors = []
    let required = [
      {field: movie.title,name: "title"},
      {field: movie.release_date,name: "release_date"},
      {field: movie.runtime,name: "runtime"},
      {field: movie.description,name: "description"},
      {field: movie.mpaa_rating,name: "mpaa_rating"},
    ]

    required.forEach(function (obj) {
      if (obj.field === "") {
        errors.push(obj.name);  
      }
    })

    if (movie.genres_array.length === 0) {
      Swal.fire({
        title: `Error!`,
        text: `You Must Choose at least 1 genre!`,
        icon: `error`,
        confirmButtonText: `OK`,
      })
      errors.push("genres")
    }
    setErrors(errors)
    if (errors.length > 0) {
        return false
    }
  } 

  const handleChange =  () => (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setMovie({
      ...movie,
      [name] : value,
    }) 
  }
  const handleCheck = (e,position) => {
    let checked = e.target.checked;
    let value = parseInt(e.target.value);
    let name = e.target.name;
    let genres = movie.genres
    let genres_array = movie.genres_array
    genres[position] = {id: value,checked:checked,genre:name}
    
    console.log(genres_array.includes(value))
    if (genres_array.length > 0 && genres_array.includes(value)) {
      console.log(checked === false)
      if (checked === false) {
        const index = genres_array.indexOf(value); // get index of the item
        if (index !== -1) { // only splice genres_array when item is found
            genres_array.splice(index, 1);
        }
      }
    } else {
      genres_array.push(parseInt(value));
    }
    
    setMovie(m => ({
      ...m,
      genres: genres,
      genres_array: genres_array
    }));
  }
  return (
    <>
      <div>
          <h2>Add/Edit Movie</h2>
          <hr />
          <pre>{JSON.stringify(movie,null,3)}</pre>
          <form onSubmit={handleSubmit} >
              <input type="hidden" name="id" value={movie.id}/>
              <Input
              title={"Title"}
              className={"form-control"}
              type={"text"}
              name={"title"}
              value={movie.title}
              onChange={handleChange("title")}
              errorDiv={hasError("title") ? "text-danger" : "d-none"}
              errorMsg={"Please enter a title"}
              />

              <Input
              title={"Release Date"}
              className={"form-control"}
              type={"date"}
              name={"release_date"}
              value={movie.release_date}
              onChange={handleChange("release_date")}
              errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
              errorMsg={"Please enter a release_date"}
              />

              <Input
              title={"Runtime"}
              className={"form-control"}
              type={"text"}
              name={"runtime"}
              value={movie.runtime}
              onChange={handleChange("runtime")}
              errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
              errorMsg={"Please enter a runtime"}
              />
              <Select 
              title={"mpaa_rating"}
              name={"mpaa_rating"}
              options={mpaaOptions}
              onChange={handleChange("mpaa_rating")}
              placeHolder={"--Pilih--"}
              errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
              errorMsg={"Please Pilih"}
              />
              <TextArea
              title="Description"
              name={"description"}
              value={movie.description}
              rows={"3"}
              onChange={handleChange("description")}
              errorDiv={hasError("description") ? "text-danger" : "d-none"}
              errorMsg={"Please enter a description"}
              />
              <hr/>
              <h3>Genres</h3>
              {movie.genres && movie.genres.length > 1 &&  
              <>
                {Array.from(movie.genres).map((g,index) => (
                  <CheckBox
                    title={g.genre}
                    name={g.genre}
                    key={index}
                    id={`genre-${index}`}
                    onChange={(e) => handleCheck(e,index)}
                    value={g.id}
                    checked={movie.genres[index].checked}
                  />
                ))}
              </>}
              <button className='btn btn-md btn-primary mt-2'>Save</button>
          </form>


      </div>
    </>
  )
}

export default EditMovie