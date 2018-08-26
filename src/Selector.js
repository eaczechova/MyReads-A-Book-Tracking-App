import React from 'react';

class Selector extends React.Component {
  /* to get selected value, from the dropdown */
  render() {
    const { shelfUpdate, book } = this.props;

    return (
      <div className="book-shelf-changer">
        <select
          value={book.shelf}
          onChange={(event) => shelfUpdate(book, event.target.value)}
        >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none" selected>None</option>
        </select>
      </div>
    )
  }
}

export default Selector
