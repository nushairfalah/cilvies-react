import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { BsFillPlusCircleFill } from "react-icons/bs"
import CreateItem from './CreateItemPage'
import ListItem from './ListItemPage'
import EditItem from './EditItem'
import Logo from '../just-do-it.png'

const Navbar = () => {
    return (
        <Router>

            {/* ---------------------------- NAVBAR LINKS ------------------------------- */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to={"/"} className="navbar-brand">
                        <img className="logo" src={Logo} alt="logo-brand" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to={"/users"} className="nav-link">list dvd</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={"/users"} className="nav-link">list dvd</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={"/users"} className="nav-link">list dvd</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={"/users"} className="nav-link">list dvd</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={"/users"} className="nav-link">list dvd</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={"/users"} className="nav-link">list dvd</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/users/add"} className="nav-link"><BsFillPlusCircleFill /> add</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* ---------------------------- ROUTE CONTENTS ------------------------------- */}
            <div className="container">
                <Switch>
                    <Route exact path="/users" component={ListItem} />
                    <Route exact path="/users/add" component={CreateItem} />
                    <Route path="/users/:id" component={EditItem} />
                </Switch>
            </div>

        </Router>
    )
}

export default Navbar
