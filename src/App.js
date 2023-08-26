import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks('harry potter');
    fetchBooks('sherlock holmes');
  }, []);

  const fetchBooks = async (query) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    const booksData = data.items || [];
    setBooks(prevBooks => [...prevBooks, ...booksData]);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    const booksData = data.items || [];
    setBooks(booksData);
    setSelectedBook(null); // Clear selected book when doing a new search
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>KeazoN BOOKS</h1>
      </header>

      <SearchBar onSearch={handleSearch} />

      <div className="book-list">
        {books.map(book => (
          <div
            key={book.id}
            className={`book-card ${selectedBook === book ? 'selected' : ''}`}
            onClick={() => handleBookClick(book)}
          >
            <h2>{book.volumeInfo.title}</h2>
            <p>Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="book-detail">
          <h2>{selectedBook.volumeInfo.title}</h2>
          <p>Author: {selectedBook.volumeInfo.authors ? selectedBook.volumeInfo.authors.join(', ') : 'Unknown'}</p>
          <p>{selectedBook.volumeInfo.description}</p>
          <a href={selectedBook.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
            Read Now
          </a>
          <a href={selectedBook.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
            More Info
          </a>
        </div>
      )}
    </div>
  );
}

export default App;



