// supporting materials: Building with React Udacity, React for Beginner by Wes Bos, reactjs.org (component lifecycle)

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import Search from './Search';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    isLoading: true,
  }

 fetch() {
    BooksAPI.getAll().then( books => {
      this.setState({
        books,
        isLoading: false,
      })
    });
 }
/* once this component is rendered, the fetch() function is run */
 componentDidMount() {
 	this.fetch();
 }

/*
  if there is a query provided, it runs search in BooksAPI;
  once completed successfully, checks if the books found are already in shelf, if they are it makes sure that the shelf   assigned on the main page and on the search page are the same;
  .catch handles incorrect query and returns no result;
  if there is no query provided, there is no search result to display;
*/
  search = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query).then( searchedBooks => {
        let searchResult = [];
          for (const serachedBook of searchedBooks) {
            for (const book of this.state.books) {
                if (serachedBook.id === book.id) {
                  serachedBook.shelf = book.shelf
                }
            }
            searchResult.push(serachedBook)
          }
          return searchResult
      }).then((searchedBooks) => {
        this.setState((prevState) => ({ searchedBooks }))
      }).catch(searchedBooks => this.setState({ searchedBooks: [] }))
    } else {
      this.setState({ searchedBooks: [] })
    }
  }
  /*
   it runs update whenever shelf selection is made;
   prior to adding a book to its selected shelf, it checks if the book is already on that shelf;
   once added, book search is reset an empty array;
  */
  shelfUpdate = (addedbook, shelf) => {
    BooksAPI.update(addedbook, shelf).then( response => {
      addedbook.shelf = shelf
    })

    let addedBooks = this.state.books.filter( book => book.id !== addedbook.id )
    addedBooks.push(addedbook);
    this.setState({ books: addedBooks })
   	this.setState({ searchedBooks: [] })
    this.componentDidMount()
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Shelf
                  books={this.state.books}
                  shelfUpdate={this.shelfUpdate}
                />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={ () => (
          <Search
            searchedBooks={this.state.searchedBooks}
            search={this.search}
            shelfUpdate={this.shelfUpdate}
          />
        )}
        />
        </div>
    )
  }
}

export default BooksApp
