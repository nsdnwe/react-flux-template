import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import BookStore from '../stores/BookStore.js';
import BookActions from '../actions/BookActions.js';

import SaveForm from './SaveForm';
import EditForm from './EditForm';
import InputField from './InputField';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class BookApp extends React.Component {
  constructor(props) {
    super(props);

    this.getPageLinks = this.getPageLinks.bind(this);

    this.storeChangeCb = this.storeChangeCb.bind(this);

    this.getSearchFilterComponent = this.getSearchFilterComponent.bind(this);
    this.getBookAddComponent = this.getBookAddComponent.bind(this);
    this.getBookEditComponent = this.getBookEditComponent.bind(this);
    this.getHomeComponent = this.getHomeComponent.bind(this);

    this.getBookLinks = this.getBookLinks.bind(this);

    this.handleBookFilterTextChange = this.handleBookFilterTextChange.bind(this);
    this.handleBookEditInputChange = this.handleBookEditInputChange.bind(this);
    this.handleBookEditSubmit = this.handleBookEditSubmit.bind(this);
    this.handleBookDelete = this.handleBookDelete.bind(this);
    this.state = {books: [], fetchStatus: 'Fetching books...', filterText: ''};
  }

  componentWillMount() {
    BookStore.on('change', this.storeChangeCb);
    BookActions.getBooks();
  }

  componentWillUnmount() {
    BookStore.removeListener('change', this.storeChangeCb);
  }

  storeChangeCb() {
    this.setState({books: BookStore.books});
    this.setState({fetchStatus: BookStore.fetchStatus});
  }

  handleBookEditInputChange(bookId, fieldName, value) {

    const bookIndex = this.state.books.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
      const booksData = this.state.books;
      let editedBookData = booksData.filter((book) => book.id === bookId)[0];
      editedBookData[fieldName] = value;
      BookActions.updateBookList(editedBookData);
    } else {
      console.error(`Cannot find book with id ${bookId}`);
    }

  }

  handleBookDelete(bookId) {
    BookActions.deleteBook(bookId);
  }

  handleBookEditSubmit(bookId) {
    BookActions.updateBook(this.state.books.filter((book) => book.id === bookId)[0]);
  }

  handleBookAddSubmit(book) {
    BookActions.addBook(book);
  }

  getPageLinks() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/book/add">Add New Book</Link></li>
          </ul>

          <hr/>
          <Route path="/" component={this.getHomeComponent}/>
          <Route path="/book/add" component={this.getBookAddComponent}/>
      </div>
    )
  }

  handleBookFilterTextChange(text) {
    this.setState({filterText: text});

    let filteredBooks = BookStore.books;

    if (text.length > 0) {
      const textAsLowerCase = text.toLowerCase();
      filteredBooks = filteredBooks.filter((book) => (
          book.name.toLowerCase().indexOf(text) !== -1 ||
          book.author.toLowerCase().indexOf(text) !== -1 ||
          book.description.toLowerCase().indexOf(text) !== -1
      ));
    }

    this.setState({books: filteredBooks});
  }

  getSearchFilterComponent() {
    return <InputField placeHolderText='Search books...' filterText={this.state.filterText} onInputTextChange={this.handleBookFilterTextChange} />
  }

  getBookEditComponent({ match }) {
    const booksById = this.state.books.filter((book) => book.id == match.params.id);
    const bookProps = booksById[0];
    return <EditForm {...bookProps} onBookEditChange={this.handleBookEditInputChange} onBookEditSubmit={this.handleBookEditSubmit} onBookDelete={this.handleBookDelete} />
  }

  getBookAddComponent() {
    return <SaveForm onBookAddSubmit={this.handleBookAddSubmit} />
  }

  getHomeComponent() {
    return (
      <div>
        {this.state.fetchStatus}
        {this.getSearchFilterComponent()}
        {this.getBookLinks()}
      </div>
    )
  }

  getBookLinks() {
    const bookLinks = this.state.books.length > 0 ? this.state.books.map(z =>
      <li key={z.id}>
        <Link to={`/book/edit/${z.id}`}>{z.name} by {z.author} (click to edit)</Link>
      </li>
    ) : [];
    return (
      <div>
        <ul>
          {bookLinks}
        </ul>
        <Route path="/book/edit/:id" component={this.getBookEditComponent} />
      </div>
    )
  }

  render() {    
    return (
      <Router>
        {this.getPageLinks()}
      </Router>
    )
  }

}

export default BookApp;
