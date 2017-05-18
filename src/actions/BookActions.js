import Dispatcher from '../dispatcher.js';
import BookActionTypes from './BookActionTypes';

const baseUrl = 'http://NsdBooksTrainingApi.azurewebsites.net/Api/Books';

const Actions = {
    getBooks() {
        console.log('BookActions: getBooks');

        Dispatcher.dispatch({
            type: BookActionTypes.GET_BOOKS
        });

        setTimeout(() => { // Remove, just to show fetchin...
            const url = baseUrl;

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: (books) => {
                    Dispatcher.dispatch({
                        type: BookActionTypes.GOT_BOOKS,
                        books
                    });
                },
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                }
            });

        }, 500);
    },

    addBook(bookProps) {
        console.log('BookActions: addBook');
        const url = baseUrl;

        $.ajax({
            url: url,
            type: 'POST',
            data: bookProps,
            dataType: 'json',
            success: (book) => {
                Dispatcher.dispatch({
                    type: BookActionTypes.ADD_BOOK,
                    book
                });
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }
        });

    },

    filterBooks(book) {
        Dispatcher.dispatch({
            type: BookActionTypes.FILTER_BOOKS,
            book
        });
    },

    updateBookList(book) {
        Dispatcher.dispatch({
            type: BookActionTypes.UPDATE_BOOK_LIST,
            book
        });
    },

    updateBook(bookProps) {
        console.log(`BookActions: updateBook "${bookProps.id}"`);
        const url = `${baseUrl}/${bookProps.id}`;

        $.ajax({
            url: url,
            type: 'PUT',
            data: bookProps,
            dataType: 'json',
            success: (book) => {
                Dispatcher.dispatch({
                    type: BookActionTypes.UPDATE_BOOK,
                    book
                });
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }
        });

    },

    deleteBook(bookId) {
        console.log(`BookActions: deleteBook "${bookId}"`);
        const url = `${baseUrl}/${bookId}`;

        $.ajax({
            url: url,
            type: 'DELETE',
            data: bookId,
            dataType: 'json',
            success: (book) => {
                Dispatcher.dispatch({
                    type: BookActionTypes.DELETE_BOOK,
                    book
                });
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }
        });

    },
};

export default Actions;
