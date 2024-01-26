import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const groupMovies = (movies, itemsPerSlide) => {
    const groupedMovies = [];
    for (let i = 0; i < movies.length; i += itemsPerSlide) {
      groupedMovies.push(movies.slice(i, i + itemsPerSlide));
    }
    return groupedMovies;
  };

//   const releaseDate = (date) => {
//     const releaseDate = new Date(date);

//     Format the date to a readable format (e.g., "June 18, 2024")
//     const formattedDate = releaseDate.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//     return formattedDate
//   }
const Movies = () => {
  const [movie, setMovie] = useState([]);
    const moviesGrouped = groupMovies(movie,5)
  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-type", "aplication/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`${process.env.REACT_APP_BACKEND}/movies`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    
    <>
      <div className="text-center">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade  "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ">
            {movie.map((m, key) => (
              <div
                key={key}
                className={`carousel-item ${key === 0 ? "active" : ""}`}
              >
                <Link to={`/movies/${m.id}`}>
                <img
                  srcSet={`http://image.tmdb.org/t/p/w780/${m.image_backdrop}`}
                  className="rounded-3" 
                  style={{width: "90%", height: "450px"}}
                  alt={m.title}
                />
                </Link>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div id="carouselExample" className="carousel slide " style={{marginTop: "-80px", zIndex: 4}} data-bs-ride="carousel">
            <div className="carousel-inner ">
            {moviesGrouped.map((m, key) => (
                    <div key={key} className={``+`carousel-item ${key === 0 ? 'active' : ''}`}>
                        <div className="row justify-content-center">
                            {m.map((mov, idx) => (
                                <div className="col-2 m-2" key={idx}>
                                    <div className="card rounded-1">
                                        <img srcset={`http://image.tmdb.org/t/p/w200/${mov.image}`}  style={{width: "100%",height: "200px"}} className="card-img-top" alt={mov.title} />
                                        {/* <h5 className="fw-bolder text-dark">{mov.title}</h5> */}

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
                <span className="visually-hidden">Next</span>
            </button>
        </div>
      </div>
    </>
  );
};

export default Movies;
