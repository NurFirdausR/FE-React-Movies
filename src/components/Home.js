import { useEffect, useState } from "react";
const SkeletonLoading = () => (
    <div className="skeleton-loading">
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
    const [movies,setMovies] = useState([])
    const [page,setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    
    
   
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
              const headers = new Headers();
              headers.append("Content-type", "application/json");
      
              const requestOptions = {
                method: "GET",
                headers: headers,
              };
      
              const response = await fetch(`/home?page=${page}&limit=10`, requestOptions);
              const data = await response.json();
              setMovies(data);
            } catch (error) {
              console.error('Error fetching movies:', error);
            } finally {
              setLoading(false);
            }
          };
      
        fetchMovies();
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
         <div>
      {loading ? (
        <SkeletonLoading /> // Display skeleton loading while data is loading
      ) : (
        <div>
        {movies && movies.length > 0 ? (
           <div className="row justify-content-center">
           {movies.map((m, idx) => (
               <div className="col-2" key={idx}>
                   <div className="card rounded-1 m-1">
                       <img srcset={`http://image.tmdb.org/t/p/w200/${m.image}`} style={{width: "100%",height: "200px"}} className="card-img-top" alt={m.title} />
                      

                   </div>
               </div>
           ))}
       </div>
        ) : (
          <p>No movies found</p>
        )}
      </div>
      )}
      <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage} disabled={page === 2}>Next</button>
    </div>
        </>
    )
}



export default Home;