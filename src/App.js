import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import CreateItem from './components/CreateItemPage'
import ListItem from './components/ListItemPage'
import EditItem from './components/EditItem'

function App() {
  return (
    <>
      <Router>

        {/* ---------------------------- NAVBAR LINKS ------------------------------- */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

          <Link to={"/"} className="navbar-brand">
            Navbar
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to={"/users"} className="nav-link">List DVD</Link>
              </li>
              <li className="nav-item">
                <Link to={"/users/add"} className="nav-link">Add DVD</Link>
              </li>
            </ul>

          </div>

        </nav>

        {/* ---------------------------- CONTENTS ------------------------------- */}
        <Switch>
          <Route exact path="/users" component={ListItem} />
          <Route exact path="/users/add" component={CreateItem} />
          <Route path="/users/:id" component={EditItem} />
        </Switch>

      </Router>

    </>
  );
}

export default App;
