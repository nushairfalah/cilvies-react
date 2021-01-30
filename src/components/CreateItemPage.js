import React, { Component } from "react";
import RentalService from "../Services/RentalService"

export default class CreateItem extends Component {
    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeUrl = this.onChangeUrl.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.newList = this.newList.bind(this)

        this.state = {
            id: null,
            title: "",
            description: "",
            imageurl: "",
            status: 0,
        }
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

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

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
            })
    }

    newList() {
        this.setState({
            id: null,
            title: "",
            description: "",
            imageurl: "",
            status: 0,
        })
    }

    render() {
        return (

            <div className="submit-form">

                <div className="form-group">
                    <label htmlFor="">Movie Title: </label>
                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeTitle} required />
                </div>

                <div className="form-group">
                    <label htmlFor="">Description: </label>
                    <textarea type="text" className="form-control" style={{ height: "200px" }} name="description" value={this.state.description} onChange={this.onChangeDescription} required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="">Image URL: </label>
                    <input type="text" className="form-control" name="imageurl" value={this.state.imageurl} onChange={this.onChangeUrl} required />
                </div>

                <div className="form-group">
                    <label htmlFor="">Status: </label>
                    <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.onChangeStatus} required />
                </div>

                <button className="btn btn-success" type="submit" onClick={this.saveItem}>Submit</button>

            </div>

        )

    }
}
