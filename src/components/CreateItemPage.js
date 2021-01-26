import React, { Component } from "react";

export default class CreateItem extends Component {
    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeUrl = this.onChangeUrl.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.newList = this.newList.bind(this)

        this.state = {
            id: null,
            title: "",
            description: "",
            url: ""
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
            url: e.target.value,
        })
    }

    saveItem() {
        let data = {
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
        }
    }

    newList() {
        this.setState({
            id: null,
            title: "",
            description: "",
            url: "",
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
                    <input type="text" className="form-control" name="imgUrl" value={this.state.url} onChange={this.onChangeUrl} required />
                </div>

                <button className="btn btn-success" type="submit" onClick={this.saveItem}>Submit</button>

            </div>

            // {/* <div className="container text-center">

            //     <form className="form-signin">

            //         <h1 className="h3 mb-3 font-weight-normal">Add Item</h1>

            //         <label for="title" className="sr-only">Title</label>
            //         <input type="text" id="inputText" className="form-control" width="150" placeholder="Title" required autofocus />
            //         <label for="description" className="sr-only">Description</label>
            //         <input type="text" id="inputText" className="form-control" placeholder="Description" required />
            //         <label for="url" className="sr-only">Image URL</label>
            //         <input type="text" id="inputText" className="form-control" placeholder="Image URL" required />
            //         <button className="btn btn-lg btn-primary btn-block" type="submit">Add</button>
            //     </form>

            // </div> */}

        )

    }
}
