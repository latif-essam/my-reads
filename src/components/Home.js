import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./../BooksAPI";
import BookShelf from "./BookShelf";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchComponent from "./SearchComponent";

class Home extends Component {
  state = {
    books: [],
  };
  componentDidMount = () => {
    BooksAPI.getAll()
      .then((books) => this.setState(() => ({ books: books })))
      .catch((e) => console.log(e));
  };

  changeShelf = (book, shelf) => {
    // getting all books and the index of the given book
    let books = [...this.state.books];
    let index = books.findIndex((b) => b.id === book.id);

    // ubdating the book shelf
    if (index !== -1) {
      books[index].shelf = shelf;
    } else {
      book.shelf = shelf;
      books.unshift(book);
    }
    // filtering  books array to remove all books with unknown shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState({
        books: books.filter((b) => b.shelf !== "none"),
      });
    });
  };
  render() {
    // getting books ready for the 3 shelfs we have by filtering them
    const { books } = this.state;

    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    const shelves = {
      currentlyReading: ["Currently Reading", currentlyReading],
      wantToRead: ["Want to Read", wantToRead],
      read: ["Read", read],
    };
    return (
      <Router>
        <>
          <Switch>
            <Route exact path="/">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {Object.keys(shelves).map((shelf) => (
                      <div key={shelves[shelf]} className="bookshelf">
                        <h2 className="bookshelf-title">{shelves[shelf][0]}</h2>
                        <BookShelf
                          books={shelves[shelf][1]}
                          changeShelf={this.changeShelf}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            </Route>
            <Route path="/search">
              <SearchComponent
                booksOnShelves={this.state.books}
                changeShelf={this.changeShelf}
              />
            </Route>
          </Switch>
        </>
      </Router>
    );
  }
}

export default Home;
