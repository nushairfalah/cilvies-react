import React, { Component } from "react";
import RentalService from "../Services/RentalService";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { GoEye, GoEyeClosed, GoSearch } from "react-icons/go";
import { RiEditLine } from "react-icons/ri"
import { MdKeyboardArrowDown } from "react-icons/md";

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.retrieveList = this.retrieveList.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.activeList = this.activeList.bind(this)
        this.getList = this.getList.bind(this)
        this.searchTitle = this.searchTitle.bind(this)
        this.onChangeSearch = this.onChangeSearch.bind(this)

        this.state = {
            Lists: [],
            currentList: null,
            currentIndex: -1,
            searchTitle: "",
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
                alert(error)
            })
    }

    onChangeSearch(e) {
        const data = e.target.value;
        this.setState({
            searchTitle: data,
        })
    }

    searchTitle() {
        this.setState({
            currentList: null,
            currentIndex: -1,
        })
        // Call API to search movies by title
        RentalService.retrieveAll(this.state.searchTitle)
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

    render() {
        const { Lists, currentList, currentIndex, searchTitle } = this.state;

        return (
            <>
                <div className="list row">

                    <div className="sticky-top col-md-12">
                        <div className="input-group mb-4">
                            <input type="text" className="form-control" value={searchTitle} onChange={this.onChangeSearch} placeholder="Search by title..." autoFocus />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.searchTitle}><GoSearch className="add-link" size="1.3rem" /></button>
                                <button className="btn btn-outline-secondary" type="button"><Link to={"/movies/add"}><FaPlus className="add-link" size="1.3rem" /></Link></button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                            <h3 className="detail-strong">Movie List<MdKeyboardArrowDown /></h3>
                            {/* <Link to={"/movies/add"}><FaPlus className="add-link" size="2rem" /></Link> */}
                        </div>

                        <ul className="list-group">
                            {Lists && Lists.map((dvd, index) => (
                                <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.activeList(dvd, index)} key={index}>
                                    <div className="d-flex justify-content-between">
                                        <span className="dvd-title">{dvd.title}</span>
                                        <div>
                                            <button className="btn-link">{dvd.status === 0 ? <GoEyeClosed /> : <GoEye />}</button>
                                            <button className="btn-link"><Link className="link-edit" to={"/movies/" + dvd.id}><RiEditLine /></Link></button>
                                            <button className="btn-link" onClick={() => { window.confirm("Delete this movie?") && this.deleteDVD(dvd.id) }}><FaRegTrashAlt /></button>
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
