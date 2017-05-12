import React from 'react';
import {addBook} from '../actions/BookActions.js';

export default class SaveForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      author: '',
      description: ''
    };

	this.handleInputChange = this.handleInputChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
  	const bookData = this.state;
  	bookData.id = Date.now();
    //alert('Submitting book with data: ' + JSON.stringify(bookData));
    console('Submitting book with data: ' + bookData);
    //addBook(bookData);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      	<h2>Add New Book</h2>
        <label>
          <input
            name="name"
            placeholder="name"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          <input
            name="author"
            placeholder="author"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          <input
            name="description"
            placeholder="description"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <div>
	        <input type="submit" value="Save" />
	    </div>
      </form>
    );
  }

}
