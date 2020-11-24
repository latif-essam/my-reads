import React, { Component } from "react";
import BookCard from "./BookCard";

class BookShelf extends Component {
  render() {
    const { books } = this.props;
    return (
      <div className="bookshelf-books">
        {books.length === 0 && (
          <>
            <p
              style={{
                fontSize: 24,
                color: "grey",
              }}
            >
              This Shelf is Empty!!
            </p>
            <img
              src="https://www.freepngimg.com/thumb/aquarium/44981-5-shelf-images-free-transparent-image-hq.png"
              alt="Empty Shelf"
              style={{
                margin: 0,
                width: 1000,
                height: 250,
              }}
            />
          </>
        )}
        <ol className="books-grid">
          {books.map((book) => (
            <BookCard
              book={book}
              key={book.id}
              changeShelf={this.props.changeShelf}
            />
          ))}
        </ol>
      </div>
    );
  }
}

export default BookShelf;
