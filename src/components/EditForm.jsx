import React from 'react';
import {addBook} from '../actions/BookActions.js';

export default class EditForm extends React.Component {

  constructor(props) {
    super(props);

  	this.handleInputChange = this.handleInputChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const inputName = target.name;

    this.props.onBookEditChange(this.props.id, inputName, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onBookEditSubmit(this.props.id);
  }

  render() {

    const name = this.props.name;
    const author = this.props.author;
    const description = this.props.description;

    return (
      <form onSubmit={this.handleSubmit}>
      	<h2>Edit Book</h2>
        <label>
          <input
            name="name"
            placeholder="name"
            type="text"
            value={name}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          <input
            name="author"
            placeholder="author"
            type="text"
            value={author}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          <input
            name="description"
            placeholder="description"
            type="text"
            value={description}
            onChange={this.handleInputChange} />
        </label>
        <div>
	        <input type="submit" value="Save" />
        </div>
      </form>
    );
  }

}
