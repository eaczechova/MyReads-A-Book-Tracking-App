import React from 'react';
import Book from './Book';

class Shelf extends React.Component {
  /*
  prior to returning the books result, they are filtered according to shelf category that has been selected
  */
  render() {
    const { books } = this.props;
    const currentlyReading = books.filter( book => book.shelf === "currentlyReading");
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {currentlyReading.map( book => (
                <li key={book.id}>
                  <Book
                    books={ this.props.books }
                    book={ book }
                    shelfUpdate={this.props.shelfUpdate}
                  />
                </li>
              ))
              }
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {wantToRead.map( book => (
                <li key={book.id}>
                  <Book
                    books={ this.props.books }
                    book={ book }
                    shelfUpdate={this.props.shelfUpdate}
                  />
                </li>
              ))
              }
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {read.map( book => (
                <li key={book.id}>
                  <Book
                    books={ this.props.books }
                    book={ book }
                    shelfUpdate={this.props.shelfUpdate}
                  />
                </li>
              ))
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
