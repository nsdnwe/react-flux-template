import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class BookStore extends EventEmitter { 
    constructor() {
        super();
        this.books = [];
    }

    handleActions(action){
        switch (action.type) {
            case "ADD_BOOK": 
                this.books.push(action.book);
                this.emit("change");
                break;
            case "FETCH_BOOKS_FULFILLED": 
                this.books = action.books;
                this.fetchStatus = "";
                this.emit("change");
                break;
        }
    }

    getAll() {
        return this.books;
    }
}

const bookStore = new BookStore;
dispatcher.register(bookStore.handleActions.bind(bookStore));
export default bookStore; 