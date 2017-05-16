import { EventEmitter } from "events";
import BookActionTypes from '../actions/BookActionTypes';
import BookDispatcher from '../dispatcher.js';

class BookStore extends EventEmitter { 
    constructor() {
        super();
        this.books = [];
        this.fetchStatus = 'Fetching books...';
    }

    handleActions(action) {
        switch (action.type) {
            case BookActionTypes.GOT_BOOKS:
                console.log('BookStore: GOT_BOOKS');
                this.books = action.books;
                this.fetchStatus = '';
                this.emit('change');
                break;
            case BookActionTypes.ADD_BOOK:
                console.log('BookStore: ADD_BOOK');
                let booksAfterAdd = this.books;
                booksAfterAdd.push(action.book);
                this.books = booksAfterAdd;
                this.emit('change');
                break;
            case BookActionTypes.UPDATE_BOOK_LIST:
                console.log('BookStore: UPDATE_BOOK_LIST');
                const updatedBookIdx = this.books.findIndex((book) => book.id === action.book.id);
                if (updatedBookIdx !== -1) {
                    let freshBooks = this.books;
                    freshBooks[updatedBookIdx] = {
                        id: action.book.id,
                        name: action.book.name,
                        author: action.book.author,
                        description: action.book.description,
                    };
                    this.books = freshBooks;
                    this.emit('change');
                }
                break;
            case BookActionTypes.UPDATE_BOOK:
                console.log('BookStore: UPDATE_BOOK');
                const bookIdx = this.books.findIndex((book) => book.id === action.book.id);
                if (bookIdx !== -1) {
                    let updatedBooks = this.books;
                    updatedBooks[bookIdx] = {
                        id: action.book.id,
                        name: action.book.name,
                        author: action.book.author,
                        description: action.book.description,
                    };
                    this.books = updatedBooks;
                    this.emit('change');
                }
                break;
            case BookActionTypes.DELETE_BOOK:
                console.log('BookStore: DELETE_BOOK');
                if (this.books.some((book) => book.id === action.book.id)) {
                    this.books = this.books.filter((book) => (
                        book.id !== action.book.id
                    ));
                    this.emit('change');
                }
                break;
        }
    }

    getAll() {
        return this.books;
    }
}

const bookStore = new BookStore();
BookDispatcher.register(bookStore.handleActions.bind(bookStore));
export default bookStore;
