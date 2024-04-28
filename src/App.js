import Home from "./components/Home"

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          <a href="" ><span className="mt-3 btn btn-md btn-primary">Login</span></a>
        </div>
        <hr/>
      </div>

      <div className="row">
        <div className="col-2">
          <nav>
            <div className="list-group">
              <a href="#!" className="list-group-item list-group-item-action">Home</a>
              <a href="#!" className="list-group-item list-group-item-action">Movies</a>
              <a href="#!" className="list-group-item list-group-item-action">Genres</a>
              <a href="#!" className="list-group-item list-group-item-action">Add Movie</a>
              <a href="#!" className="list-group-item list-group-item-action">Manage Catalog</a>
              <a href="#!" className="list-group-item list-group-item-action">GraphQL</a>
            </div>
          </nav>
        </div>
        <div className="col-10">
          <Home/>
        </div>
      </div>
    </div>
  );
}

export default App;
