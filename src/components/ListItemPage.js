import React, { Component } from "react"
import RentalService from "../Services/RentalService"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash, FaRegTrashAlt, FaPencilAlt } from "react-icons/fa"
import { BsFillPlusCircleFill } from "react-icons/bs"

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.retrieveList = this.retrieveList.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.activeList = this.activeList.bind(this)
        this.getList = this.getList.bind(this)
        // this.deleteList = this.deleteList.bind(this)

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

    // deleteList(id) {
    //     RentalService.delete()
    //         .then((response) => {
    //             this.getList(id)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    render() {
        const { Lists, currentList, currentIndex } = this.state;

        return (
            <>
                <div className="list row">
                    <div className="col-md-6">
                        <h3>DVD List</h3>
                        <ul className="list-group">
                            {Lists && Lists.map((List, index) => (
                                <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.activeList(List, index)} key={index}>
                                    <div className="d-flex justify-content-between">
                                        {List.title} <div>{List.status === 0 ? <FaEyeSlash /> : <FaEye />} <FaPencilAlt /> <FaRegTrashAlt /></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6">
                        {currentList ? (
                            <div>

                                <h4>Detail</h4>
                                <Link to={"/users/" + currentList.id} className="badge badge-pill badge-success">Edit</Link>

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
                                    <br />
                                    <h4>Detail</h4>
                                </div>
                            )}
                    </div>

                </div>
            </>
        )
    }
}
