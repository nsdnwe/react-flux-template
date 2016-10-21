import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import BookStore from '../stores/BookStore.js';
import * as BookActions from '../actions/BookActions.js';
import Book from './Book.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.getAllBooks = this.getAllBooks.bind(this); // Must be
    this.state = {
      books : BookStore.getAll(),
      name: "",
      fetchStatus: "Fetching books..."
    }
  }

  // Kuunnellaan change eventtiä. Kun tulee, haetaan kaikki kirjat
  componentWillMount() {
    BookStore.on("change", this.getAllBooks)
    BookActions.getBooks();
    console.log("Number", BookStore.listenerCount("change"));
  }
  
  componentWillUnmount() {
    BookStore.removeListener("change", this.getAllBooks)
  }

  getAllBooks() {
    this.setState({books: BookStore.getAll()})
    this.setState({fetchStatus: BookStore.fetchStatus})
  }

  addBook() {
    BookActions.addBook({id: Date.now(), name: this.state.name, author: "Me", description: "cc"})
    this.state.name = "";
  }

  getBooks() {
    BookActions.getBooks();
  }

  render() {
    const mappedBooks = this.state.books.map(z => <Book key={z.id} name={z.name} author={z.author} />)
    return (
      <div>
        <div>
          {this.state.fetchStatus}
          {mappedBooks}
        </div>
        <input value={this.state.name} onChange={(me) => this.setState({name: me.target.value})}></input>
        <div><button onClick={this.addBook.bind(this)}>Add New</button></div>
      </div>
    )
  }
}