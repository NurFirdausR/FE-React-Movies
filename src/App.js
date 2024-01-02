import { Link, Outlet } from "react-router-dom";


function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          <Link to="/login" ><span className="mt-3 btn btn-md btn-primary">Login</span></Link>
        </div>
        <hr/>
      </div>

      <div className="row">
        <div className="col-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
              <Link to="/admin/movie" className="list-group-item list-group-item-action">Add Movie</Link>
              <Link to="/admin" className="list-group-item list-group-item-action">Manage Catalog</Link>
              <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
            </div>
          </nav>
        </div>
        <div className="col-10">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
