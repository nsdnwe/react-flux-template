import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import BookStore from '../stores/BookStore.js';
import * as BookActions from '../actions/BookActions.js';
import Book from './Book.jsx';

import SaveForm from './SaveForm.jsx';
import EditForm from './EditForm.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const AddNewBook = () => (
  <SaveForm />
)

const PageLinks = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/book/add">Add New Book</Link></li>
    </ul>

    <hr/>
    <Route path="/book/add" exact={true} component={AddNewBook}/>
  </div>
)

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getPageLinks = this.getPageLinks.bind(this);

    this.getBookEditComponent = this.getBookEditComponent.bind(this);
    this.getHomeComponent = this.getHomeComponent.bind(this);

    this.getAllBooks = this.getAllBooks.bind(this); // Must be
    this.getBookLinks = this.getBookLinks.bind(this);
    this.handleBookEditInputChange = this.handleBookEditInputChange.bind(this);
    this.handleBookEditSubmit = this.handleBookEditSubmit.bind(this);
    this.state = {books: []}
  }

  // Kuunnellaan change eventtiä. Kun tulee, haetaan kaikki kirjat
  componentWillMount() {
    BookStore.on("change", this.getAllBooks);
    BookActions.getBooks();
    console.log("Number", BookStore.listenerCount("change"));

  }

  componentWillUnmount() {
    BookStore.removeListener("change", this.getAllBooks);
  }

  getAllBooks() {

    this.setState({books: BookStore.getAll()});
    this.setState({fetchStatus: BookStore.fetchStatus});

  }

  handleBookEditInputChange(bookId, fieldName, value) {

    const bookIndex = this.state.books.findIndex((book) => book.id == bookId);

    if (bookIndex != -1) {
      let booksData = this.state.books;
      let editedBookData = booksData.filter((book) => book.id == bookId)[0];
      editedBookData[fieldName] = value;
      booksData[bookIndex] = editedBookData;
      this.setState({books: booksData});
    } else {
      console.error(`Cannot find book with id ${bookId}`);
    }

  }

  handleBookEditSubmit(bookId) {
    console.log('edit submit of book ' + bookId);
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
          <Route path="/book/add" component={AddNewBook}/>
      </div>
    )
  }

  getBookEditComponent({ match }) {
    const booksById = this.state.books.filter((book) => book.id == match.params.id);
    const bookProps = booksById[0];
    return <EditForm {...bookProps} onBookEditChange={this.handleBookEditInputChange} onBookEditSubmit={this.handleBookEditSubmit} />
  }

  getHomeComponent() {
    return (
      <div>
        {this.state.fetchStatus}
        {this.getBookLinks()}
      </div>
    )
  }

  getBookLinks() {
    const bookLinks = this.state.books.map(z =>
      <li key={z.id}>
        <Link to={`/book/edit/${z.id}`}>{z.name} by {z.author} (click to edit)</Link>
      </li>
    )
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
