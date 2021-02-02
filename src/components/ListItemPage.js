import React, { Component } from "react"
import RentalService from "../Services/RentalService"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash, FaRegTrashAlt, FaPencilAlt } from "react-icons/fa"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { MdKeyboardArrowDown } from "react-icons/md"

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
                this.refreshList()
            })
            .catch((error) => {
                alert("error")
            })
    }

    render() {
        const { Lists, currentList, currentIndex } = this.state;
        // const confirm = window.confirm("Are you sure ?")
        // const remove = this.deleteDVD()
        // if (confirm) {
        //     return remove;
        // }

        return (
            <>
                <div className="list row">

                    <div className="col-md-6">

                        <div className="d-flex justify-content-between">
                            <h3 className="detail-strong">Movie List<MdKeyboardArrowDown /></h3>
                            <Link to={"/users/add"}><BsFillPlusCircleFill className="add-link" size="2rem" /></Link>
                        </div>

                        <ul className="list-group">

                            {Lists && Lists.map((dvd, index) => (
                                <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.activeList(dvd, index)} key={index}>
                                    <div className="d-flex justify-content-between">
                                        {dvd.title}

                                        <div>
                                            <button className="btn-link">{dvd.status === 0 ? <FaEyeSlash /> : <FaEye />}</button>
                                            <button className="btn-link"><Link className="link-edit" to={"/users/" + dvd.id}><FaPencilAlt /></Link></button>
                                            <button className="btn-link" onClick={() => this.deleteDVD(dvd.id)}><FaRegTrashAlt /></button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6">
                        {currentList ? (
                            <div>
                                <h4 className="detail-strong">Detail</h4>

                                <div className="group-detail">
                                    <img className="size-image" src={currentList.imageurl} alt="Cover DVD" />
                                </div>
                                <div className="group-detail">
                                    <label className="detail-strong">
                                        <strong>Title:</strong>
                                    </label>
                                    <p className="detail-form">{currentList.title}</p>
                                </div>
                                <div className="group-detail">
                                    <label className="detail-strong">
                                        <strong>Description:</strong>
                                    </label>
                                    <p className="detail-form">{currentList.description}</p>
                                </div>

                            </div>
                        ) : (
                                <div>
                                    <h4 className="detail-strong">Detail</h4>
                                </div>
                            )}
                    </div>

                </div>
            </>
        )
    }
}
