import React, { Component } from "react";
import "./../styles/BookCard.css";
import * as BooksAPI from "../BooksAPI";

class BookCard extends Component {
  state = {
    shelf: "none",
  };

  //refreshing books for every shelf on starting the app
  componentDidMount = () => {
    if (!this.props.book.shelf) {
      let bookOnShelf = this.props.book.shelf;

      // console.log(
      //   `this.props.book.shelf == ${this.props.book.shelf} and booksonShelf ${this.props.booksOnShelf}`
      // );
      if (bookOnShelf) {
        this.setState({ shelf: bookOnShelf.shelf });
      }
    } else {
      this.setState({ shelf: this.props.book.shelf });
    }
  };
  // handle the select from the user to change the shelf
  handleChange = (e) => {
    this.setState({ shelf: e.target.value });
    // update the books data, so whenever we refresh the page the same books are still on the same shelf as we moved them
    BooksAPI.update(this.props.book, e.target.value)
      .then((res) => {
        this.props.changeShelf(this.props.book, this.state.shelf);
      })
      .catch((error) => {
        console.log("Erros of Update", error);
      });
  };

  render() {
    const book = { ...this.props.book };
    const defaultCover =
      "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    let bookCover =
      book.imageLinks && book.imageLinks.smallThumbnail ? true : false;
    bookCover = bookCover
      ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail
      : "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {bookCover && (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${bookCover})`,
                }}
              />
            )}
            {!bookCover && (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${defaultCover})`,
                }}
              />
            )}
            <div className="book-page-number">
              <p className="book-page-number">
                <span>{book.pageCount}</span>
              </p>
            </div>
            <div className="book-shelf-changer">
              <select onChange={this.handleChange} value={this.state.shelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", and ") : " Unknown Author!!!"}
          </div>
        </div>
      </li>
    );
  }
}

export default BookCard;
