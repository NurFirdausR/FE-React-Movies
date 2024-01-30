import { useEffect, useState } from "react";
import "./../style/global.css";
import { Link, useLocation } from "react-router-dom";
import Input from "./form/Input";
import { motion } from "framer-motion";


const SkeletonLoading = () => (
  <div className="skeleton-loading ">
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
    </div>
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
    </div>
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
    </div>
  </div>
);

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm,setSearchTerm] = useState("");
  const [fullList,setFullList] = useState([]);
const location = useLocation();
  const performSearch = (page) => {
    const payload = `
    {
      search(titleContains: "${searchTerm}") {
        id
        title
        runtime
        release_date
        mpaa_rating
        image
        image_backdrop
      }
    }`;

    const headers = new Headers()

    headers.append("Content-Type","application/grapql");

    const requestOptions = {
      method : "POST",
      headers: headers,
      body: payload,
    }

    fetch(`${process.env.REACT_APP_BACKEND}/home?page=${page}&limit=18`, requestOptions)
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
      performSearch(page);
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
        image
        image_backdrop
      }
    }`;

    const headers = new Headers()

    headers.append("Content-Type","aplication/grapql")

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: payload,
    }

    fetch(`${process.env.REACT_APP_BACKEND}/home?page=${page}&limit=18`,requestOptions)
    .then((response) => response.json())
    .then((response) => {
      let theList = Object.values(response.data.listdata)
      setMovies(theList)
      setFullList(theList)
    })
    .catch(err => console.log(err))
  }, [page]); // Fetch movies when page changes

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
   <div className="container mx-5">
   <form action="" onSubmit={handleChange}>
        <Input 
        title={"Search"}
        type={"search"}
        name={"search"}
        className={"form-control"}
        value={searchTerm}
        onChange={handleChange}/>
      </form>
   </div>
      <div className="mx-5">
        {loading ? (
          <SkeletonLoading /> // Display skeleton loading while data is loading
        ) : (
          <div>
            {movies && movies.length > 0 ? (
              <div className="row justify-content-center">
             {movies.map((m, idx) => (
        <div className="col-2" key={idx}>
          <motion.div
           key={location.pathname} 
            initial={{ opacity: 0, y: 50 }} // Initial animation properties
            animate={{ opacity: 1, y: 0 }} // Animate properties
            exit={{ opacity: 0, y: 50 }} // Exit animation properties
            transition={{ delay: idx * 0.1, ease: "easeOut", duration: 2 }} // Transition properties
          >
            <Link to={`/movies/${m.id}`}>
              <div className={`card cardmovie rounded-1 m-1 mb-3`}>
                <img
                  srcSet={`http://image.tmdb.org/t/p/w200/${m.image}`}
                  style={{ width: "100%", height: "200px" }}
                  className={`card-img-top image`}
                  alt={m.title}
                />
                <div className={`middle w-100`}>
                  <div className={`textmovie`}>{m.title}</div>
                  <div className={`textmovie`}>{m.mpaa_rating}</div>
                  <div className={`textmovie`}>{m.runtime + " minutes"}</div>
                  <div className={`textmovie`}>
                    {new Date(m.release_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      ))}
              </div>
            ) : (
              <p>No movies found</p>
            )}
          </div>
        )}
      </div>
        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight text-start">
            <button
              className="btn btn-md btn-primary "
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Previous
            </button>
          </div>
          <div class="p-2 flex-fill bd-highlight text-end">
            <button
              className="btn btn-md btn-primary "
              onClick={handleNextPage}
              disabled={page === 2}
            >
              Next
            </button>
          </div>
        </div>
    </>
  );
};

export default Home;
