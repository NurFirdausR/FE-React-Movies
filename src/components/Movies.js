import { useEffect, useState } from "react";

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
                description: "Some long description"
            }
        ]
    })
    return (
        <>  
            <div className="text-center">
                    <h2>Movies</h2>
                    <hr/>
            </div>
        </>
    )
}



export default Movies;