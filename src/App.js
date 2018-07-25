//External Dependencies
import React from "react";
import { Link, Route } from "react-router-dom"
//Our Dependencies
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from"./components/Bookshelf.js";
import Search from "./components/Search.js";

/**
*Main React Component "BookApp" using ES6 class component
*/
class BooksApp extends React.Component {

  state = {
    books : []
  }

  /**
  *Get the books avaliable on the bookshelf using the BookAPI getAll method
  *invoked immediately before the component is inserted into the DOM
  */
  componentWillMount(){
    BooksAPI.getAll().then(books=>{
      this.setState({books});
    });
  }

  /**
  *Update the shelf if a shelf selection is changed, if "none" selected remove that book.
  */
  updateShelfForBook = (selectedBook, newShelf) => {
    //Update this.state.books.
    this.setState(prevState => {
      let includeBook = true;
      //Check if the selectedBook is in the bookshelf
      prevState.books.forEach(book => {
        if(selectedBook.id === book.id)
          includeBook = false;
      });
      //If the book is not in the bookshelf then add it
      if(includeBook)
        prevState.books.splice(1, 0, selectedBook);
      return ({
        books: prevState.books
          //Update books to current shelves
          .map(book => {
            if(book.id === selectedBook.id)
                book.shelf = newShelf;
            return book;
          })
          //remove from list if book selection is "none".
          .filter(b => b.shelf !== "none")
      })
    });
    //Update serverside with change.
    BooksAPI.update(selectedBook, newShelf);
  }

  render(){
    return (
      <div className="app">
        {/*Route/Display if on "search" page*/}
        <Route path = "/search" render={() => (
            <Search
             updateShelfForBook = {this.updateShelfForBook}
             currentBooks ={this.state.books}
            />
        )}/>
        {/*Route/Display if on "main" page*/}
        <Route exact path = "/" render={() => (
          <div className="list-books">
            {/*Book Shelf*/}
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title="Currently Reading"
                  selectedBooks={this.state.books.filter(book => book.shelf === "currentlyReading")}
                  updateShelfForBook={this.updateShelfForBook}
                />
                <Bookshelf
                  title="Want to Read"
                  selectedBooks={this.state.books.filter(book => book.shelf === "wantToRead")}
                  updateShelfForBook={this.updateShelfForBook}
                />
                <Bookshelf
                  title="Read"
                  selectedBooks={this.state.books.filter(book => book.shelf === "read")}
                  updateShelfForBook={this.updateShelfForBook}
                />
              </div>
            </div>
            {/*Link to search Page*/}
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp;

