import React, { Component } from "react";
import RentalService from "../Services/RentalService"
import { FaToggleOff, FaToggleOn } from "react-icons/fa"

export default class CreateItem extends Component {
    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeUrl = this.onChangeUrl.bind(this)
        // this.onChangeStatus = this.onChangeStatus.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.newList = this.newList.bind(this)
        this.toggleButton = this.toggleButton.bind(this)

        this.state = {
            id: null,
            title: "",
            description: "",
            imageurl: "",
            status: false,
        }
    }

    toggleButton() {
        this.setState({
            status: !this.state.status
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        })
    }

    onChangeUrl(e) {
        this.setState({
            imageurl: e.target.value,
        })
    }

    // onChangeStatus(e) {
    //     this.setState({
    //         status: e.target.value
    //     })
    // }

    saveItem() {
        let data = {
            title: this.state.title,
            description: this.state.description,
            imageurl: this.state.imageurl,
            status: this.state.status,
        }

        RentalService.create(data)
            .then(() => {
                this.props.history.goBack()
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
    }

    newList() {
        this.setState({
            id: null,
            title: "",
            description: "",
            imageurl: "",
            status: false,
        })
    }

    render() {
        return (

            <div className="submit-form">

                <div className="form-group">
                    <label htmlFor="">Movie Title: </label>
                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeTitle} placeholder="Title" required />
                </div>

                <div className="form-group">
                    <label htmlFor="">Description: </label>
                    <textarea type="text" className="form-control" style={{ height: "200px" }} name="description" value={this.state.description} onChange={this.onChangeDescription} placeholder="Description" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="">Image URL: </label>
                    <input type="text" className="form-control" name="imageurl" value={this.state.imageurl} onChange={this.onChangeUrl} placeholder="URL" required />
                </div>

                <div className="form-group">
                    <label htmlFor="">Status: </label>
                    <button className="btn-toggle" name="status" value={this.state.status} onClick={this.toggleButton}>{this.state.status ? <FaToggleOn size="2rem" /> : <FaToggleOff size="2rem" />}</button>
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-dark" onClick={() => this.props.history.goBack()}>{`< Back`}</button>
                    <button className="btn btn-success" type="submit" onClick={this.saveItem}>Submit</button>
                </div>
            </div>

        )

    }
}
