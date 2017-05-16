import React from 'react';

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
    event.preventDefault();
    this.props.onBookAddSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      	<h2>Add New Book</h2>
        <input
          name="name"
          placeholder="name"
          type="text"
          onChange={this.handleInputChange} />
        <br />
        <input
          name="author"
          placeholder="author"
          type="text"
          onChange={this.handleInputChange} />
        <br />
        <input
          name="description"
          placeholder="description"
          type="text"
          onChange={this.handleInputChange} />
        <div>
	        <input type="submit" value="Save" />
	    </div>
      </form>
    );
  }

}
