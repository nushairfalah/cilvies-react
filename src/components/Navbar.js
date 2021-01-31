import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { BsFillPlusCircleFill } from "react-icons/bs"
import CreateItem from './CreateItemPage'
import ListItem from './ListItemPage'
import EditItem from './EditItem'

const Navbar = () => {
    return (
        <>
            <Router>

                {/* ---------------------------- NAVBAR LINKS ------------------------------- */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <Link to={"/"} className="navbar-brand">
                        <img className="logo" src="" alt="logo-brand" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to={"/users"} className="nav-link">LIST DVD</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/users/add"} className="nav-link"><BsFillPlusCircleFill /> ADD</Link>
                            </li>
                        </ul>
                    </div>

                </nav>

                {/* ---------------------------- ROUTE CONTENTS ------------------------------- */}
                <Switch>
                    <Route exact path="/users" component={ListItem} />
                    <Route exact path="/users/add" component={CreateItem} />
                    <Route path="/users/:id" component={EditItem} />
                </Switch>

            </Router>

        </>
    )
}

export default Navbar
