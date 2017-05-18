import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component {

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    this.props.onInputTextChange(value);
	}

	render() {
	    const filterText = this.props.filterText || '';
	    const placeHolderText = this.props.placeHolderText || '';

	    return (
	    	<div>
		        <input
		          placeholder={placeHolderText}
		          type="text"
		          value={filterText}
		          onChange={this.handleInputChange} />
		    </div>
		);
	}

}

InputField.propTypes = {
  filterText: PropTypes.string,
  placeHolderText: PropTypes.string,
};

export default InputField
