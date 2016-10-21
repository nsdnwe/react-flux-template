import dispatcher from '../dispatcher.js';

export function addBook(book) {
    dispatcher.dispatch({
        type: "ADD_BOOK",
        book
    })
}

export function getBooks() {
    dispatcher.dispatch({
        type: "FETCHING_BOOKS"
    })
    setTimeout(() => { // Remove, just to show fetchin...
        const url = 'http://NsdBooksTrainingApi.azurewebsites.net/Api/Books/';
        $.getJSON(url).done(books =>
            dispatcher.dispatch({
                type: "FETCH_BOOKS_FULFILLED",
                books
            })
        );
    }, 500)
}
