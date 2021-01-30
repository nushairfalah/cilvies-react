import React, { Component } from 'react'
import RentalService from "../Services/RentalService"

export default class EditList extends Component {
    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeUrl = this.onChangeUrl.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.getList = this.getList.bind(this)
        this.updateList = this.updateList.bind(this)
        this.deleteList = this.deleteList.bind(this)

        this.state = {
            currentList: {
                id: null,
                title: "",
                description: "",
                imageurl: "",
                status: 0,
            },
            message: "",
        }
    }

    componentDidMount() {
        this.getList(this.props.match.params.id)
    }

    onChangeTitle(e) {
        const title = e.target.value

        this.setState((prevState) => ({
            currentList: {
                ...prevState.currentList,
                title: title,
            },
        }))
    }

    onChangeDescription(e) {
        const description = e.target.value

        this.setState((prevState) => ({
            currentList: {
                ...prevState.currentList,
                description: description,
            },
        }))
    }

    onChangeUrl(e) {
        const imageurl = e.target.value

        this.setState((prevState) => ({
            currentList: {
                ...prevState.currentList,
                imageurl: imageurl,
            },
        }))
    }

    onChangeStatus(e) {
        const status = e.target.value

        this.setState((prevState) => ({
            currentList: {
                ...prevState.currentList,
                status: status,
            },
        }))
    }

    getList(id) {
        RentalService.retrieveById(id)
            .then((response) => {
                const data = response.data
                this.setState({
                    currentList: data,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    updateList() {
        RentalService.update(this.state.currentList.id, {
            title: this.state.currentList.title,
            description: this.state.currentList.description,
            imageurl: this.state.currentList.imageurl,
            status: this.state.currentList.status,
        })
            .then((response) => {
                this.setState({
                    message: "Data updated successfully",
                })
            })
            .catch((error) => {
                this.setState({
                    message: "Error when updating data",
                })
            })
    }

    deleteList() {
        RentalService.delete(this.state.currentList.id)
            .then((response) => {
                this.props.history.goBack();
            })
            .catch((error) => {
                this.setState({
                    message: "Error when updating data" + error
                })
            })
    }

    render() {
        const { currentList } = this.state

        if (currentList.status === isNaN) {
            currentList.status = 0;
        }

        return (
            <div>
                {currentList ? (
                    <div className="submit-form">

                        <div className="form-group">
                            <label htmlFor="">Movie Title: </label>
                            <input type="text" className="form-control" name="title" value={currentList.title} onChange={this.onChangeTitle} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Description: </label>
                            <textarea type="text" className="form-control" style={{ height: "200px" }} name="description" value={currentList.description} onChange={this.onChangeDescription} required></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Image URL: </label>
                            <input type="text" className="form-control" name="imageurl" value={currentList.imageurl} onChange={this.onChangeUrl} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Status: </label>
                            <input type="text" className="form-control" name="status" value={currentList.status} onChange={this.onChangeStatus} required />
                        </div>

                        <div className="d-flex justify-content-between">
                            <button className="btn btn-dark" onClick={() => this.props.history.goBack()}>{`< Back`}</button>
                            <button className="btn btn-success" type="submit" onClick={this.updateList}>Edit</button>
                            <button className="btn btn-danger" onClick={this.deleteList}>Delete</button>
                        </div>
                        <p>{this.state.message}</p>

                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Book...</p>
                        </div>
                    )}
            </div>
        )
    }


}

