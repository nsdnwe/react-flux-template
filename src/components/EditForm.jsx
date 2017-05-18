import React from 'react';
import PropTypes from 'prop-types';

class EditForm extends React.Component {

  constructor(props) {
    super(props);

  	this.handleInputChange = this.handleInputChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete(e) {
    e.preventDefault();
    this.props.onBookDelete(this.props.id);
  }

  render() {

    const name = this.props.name || '';
    const author = this.props.author || '';
    const description = this.props.description || '';

    return (
      <form onSubmit={this.handleSubmit}>
      	<h2>Edit Book</h2>
        <input
          name="name"
          placeholder="name"
          type="text"
          value={name}
          onChange={this.handleInputChange} />
        <br />
        <input
          name="author"
          placeholder="author"
          type="text"
          value={author}
          onChange={this.handleInputChange} />
        <br />
        <input
          name="description"
          placeholder="description"
          type="text"
          value={description}
          onChange={this.handleInputChange} />
        <div>
          <input type="submit" value="Save" />
          <input type="button" value="Delete" onClick={this.handleDelete} />
        </div>
      </form>
    );
  }

}

EditForm.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
};

export default EditForm
