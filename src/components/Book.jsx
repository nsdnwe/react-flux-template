import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
    render() {
        return (
            <div>{this.props.name} by {this.props.author}</div>
        )
    }
}

Book.propTypes = {
	name: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
};

export default Book;
