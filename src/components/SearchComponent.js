import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./../styles/search.css";
import * as BooksAPI from "./../BooksAPI";
import BookCard from "./BookCard";

class SearchComponent extends Component {
  state = {
    searchInput: "",
    books: [],
    validInput: true,
    shelf: "none",
  };
  // updating books result for each change on the input field
  updateSearchResults = (result) => {
    this.setState(() => ({
      searchInput: result,
    }));
    if (result.length === 0) {
      this.setState(() => ({ books: [] }));
      return;
    }
    BooksAPI.search(result)
      .then((res) => {
        if (res && res.length > 0) {
          this.setState(() => ({
            books: res,
            validInput: true,
          }));
        } else this.setState({ books: [], validInput: false });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    const { searchInput, books, validInput } = this.state;
    return (
      <>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => this.updateSearchResults(e.target.value)}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            {validInput ? (
              <ol className="books-grid">
                {books.map((book) => (
                  <BookCard
                    book={book}
                    booksOnShelves={this.props.booksOnShelves}
                    key={book.id}
                    changeShelf={this.props.changeShelf}
                  />
                ))}
              </ol>
            ) : (
              <p>Books not found</p>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default SearchComponent;
