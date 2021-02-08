import React, { Component } from "react";
import RentalService from "../Services/RentalService";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaPlus, FaRegPlusSquare } from "react-icons/fa";
import { GoEye, GoEyeClosed } from "react-icons/go";
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
                // const array = this.state.Lists
                const data = response.data;
                this.setState({
                    Lists: data.reverse(),
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
                    Lists: data.reverse(),
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

                    <div className="col-md-7 m-auto">
                        <div className="input-group mb-4">
                            <input type="search" className="form-control" value={searchTitle} onChange={this.onChangeSearch} onKeyPress={this.searchTitle} placeholder="Search by title..." autoFocus />
                            {/* <span className="input-group-append">
                                <div className="btn btn-outline-secondary border-left-0 border" onClick={this.searchTitle}><FaTimes /></div>
                            </span> */}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                            <h3 className="detail-strong">movie list<MdKeyboardArrowDown /></h3>
                            <button className="btn"><Link to={"/movies/add"}><FaRegPlusSquare size="1.5rem" /></Link></button>
                        </div>

                        <ul className="list-group">
                            {Lists && Lists.map((dvd, index) => (
                                <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.activeList(dvd, index)} key={index}>
                                    <div className="d-flex justify-content-between">
                                        <span className="dvd-title">{dvd.title}</span>
                                        <div>
                                            <button className="btn-link">{dvd.status === 0 ? <GoEyeClosed /> : <GoEye />}</button>
                                            <button className="btn-link"><Link to={"/movies/" + dvd.id} className="link-edit"><RiEditLine /></Link></button>
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
                                    <img className="img-fluid size-image" src={currentList.imageurl} alt="Cover DVD" />
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
                                <div className="col-md-6">
                                    <h4 className="detail-strong">Detail</h4>
                                </div>
                            )}
                    </div>

                </div>
            </>
        )
    }
}
