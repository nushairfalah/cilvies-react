import React, { Component } from "react"
import RentalService from "../Services/RentalService"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash, FaRegTrashAlt, FaPencilAlt } from "react-icons/fa"

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.retrieveList = this.retrieveList.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.activeList = this.activeList.bind(this)
        this.getList = this.getList.bind(this)

        this.state = {
            Lists: [],
            currentList: null,
            currentIndex: -1,
        }
    }

    componentDidMount() {
        this.retrieveList();
    }

    retrieveList() {
        RentalService.retrieveAll()
            .then((response) => {
                const data = response.data;
                this.setState({
                    Lists: data,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    refreshList() {
        this.retrieveList()
        this.setState({
            currentList: null,
            currentIndex: -1,
        })
    }

    activeList(List, index) {
        this.setState({
            currentList: List,
            currentIndex: index,
        })
    }

    getList(id) {
        RentalService.retrieveById(id)
            .then((response) => {
                const data = response.data
                this.setState({
                    currentIndex: data,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteDVD(id) {
        RentalService.delete(id)
            .then((response) => {
                alert("data deleted")
                this.refreshList()
            })
            .catch((error) => {
                alert("error")
            })
    }

    render() {
        const { Lists, currentList, currentIndex } = this.state;

        return (
            <>
                <div className="list row">

                    <div className="col-md-6">
                        <h3>DVD List</h3>
                        <ul className="list-group">
                            {Lists && Lists.map((dvd, index) => (
                                <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.activeList(dvd, index)} key={index}>
                                    <div className="d-flex justify-content-between">
                                        {dvd.title}
                                        <div>
                                            {dvd.status === 0 ? <FaEyeSlash /> : <FaEye />}{" "}
                                            <Link to={"/users/" + dvd.id}><FaPencilAlt /></Link>{" "}
                                            <button onClick={() => this.deleteDVD(dvd.id)}><FaRegTrashAlt /></button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6">
                        {currentList ? (
                            <div>

                                <h4>Detail</h4>

                                <div>
                                    <img className="size-image" src={currentList.imageurl} alt="Cover DVD" />
                                </div>
                                <div>
                                    <label>
                                        <strong>Title:</strong>
                                    </label>
                                    <p>{currentList.title}</p>
                                </div>
                                <div>
                                    <label>
                                        <strong>Description:</strong>
                                    </label>
                                    <p>{currentList.description}</p>
                                </div>

                            </div>
                        ) : (
                                <div>
                                    <h4>Detail</h4>
                                </div>
                            )}
                    </div>

                </div>
            </>
        )
    }
}
