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

            Dispatcher.dispatch({
                type: BookActionTypes.GOT_BOOKS,
                books: [{"id":79,"name":"Battle of Mordor","author":"Somebody","description":"Let the battle of the twins begin!"},
                {"id":96,"name":"Learn C++ in 21 days","author":"Somebody","description":"Now you can program in C++ too, in just 21 days!"},
                {"id":97,"name":"Joy of Clojure","author":"Michael Fogus","description":"The Joy of Clojure, Second Edition is a deep look at the Clojure language. "},
                {"id":98,"name":"Programming in Scala","author":"Odersky","description":"Learn to program in Scala"},
                {"id":100,"name":"Sample","author":"Niko","description":"Testing only"},
                {"id":101,"name":"efewfeffe","author":"wefefefewf","description":"affaaaaaaaaaaaaaafs"},
                {"id":102,"name":"wwwwwwwwwwww","author":"qqqqqqqqqqqqqqqq","description":"qqqqqqqwwwwwwwwwwwwwwwwwwwwwwwww"},
                {"id":103,"name":"test","author":"test","description":"test"},
                {"id":107,"name":"Testikirja","author":"Testikirjoittaja","description":"Testikuvaus"},
                {"id":129,"name":"Aapiskukko","author":"Aapo Kukkonen","description":"ABC"},
                {"id":130,"name":"Hohto","author":"King","description":"Golf"},
                {"id":132,"name":"7 asd V","author":"AK","description":"Kirja"}]
            });

            /*
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
            */

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
