import React from 'react';

class Book extends React.Component {
    render() {
        return (
            <div>{this.props.name} by {this.props.author}</div>
        )
    }
}

Book.propTypes = {
	name: React.PropTypes.string.isRequired,
	author: React.PropTypes.string.isRequired,
};

export default Book;
