# Library Management System

## Overview

This console-based Library Management System is implemented in TypeScript. It demonstrates TypeScript features including classes, recursion, lists, asynchronous functions, and exception handling.

The application lets users manage a collection of books through a terminal menu. Users can add books, display books, search books, borrow books, return books, and save or load library data from a JSON file.

## Unique Module Requirements

This project was created to satisfy the TypeScript module requirements and includes:

* Display output to the terminal via console logs
* Recursion in `Library.recursiveSearch()` to search book titles
* Classes: `Book`, `Library`, and application logic in `index.ts`
* Lists/arrays of book objects managed inside the `Library` class
* Asynchronous functions for file I/O in `Library.loadBooks()` and `Library.saveBooks()`
* Exception handling for invalid book operations such as duplicate IDs, borrowing unavailable books, and returning already available books

## Demo Video

[Software Demo Video](https://youtu.be/1VxZvs990s4)

## Learning Strategies

While building this project, I used the following learning strategies:

* Consulted the official TypeScript documentation for syntax and compiler configuration
* Used incremental testing by running the app after each new feature implementation
* Wrote small, focused functions and classes to isolate behavior
* Practiced debugging with console output and error handling
* Reviewed example TypeScript projects to understand common patterns

## Development Environment

* Visual Studio Code
* Node.js
* TypeScript
* GitHub
* Windows PowerShell

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Run the application:

   ```bash
   npm start
   ```

## Features

* Add new books to the library
* Display all books
* Search for books by title
* Borrow books
* Return books
* Save library data to a JSON file
* Load library data from a JSON file
* Exception handling for invalid operations
* Recursive search functionality
* Asynchronous file operations using async/await

## Useful Websites

* https://www.typescriptlang.org/
* https://www.typescriptlang.org/docs/
* https://nodejs.org/en/docs
* https://docs.github.com/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript

## Future Work

* Add user account management
* Implement book categories and genres
* Store data in a database instead of a JSON file
* Add a graphical user interface (GUI)
* Implement book reservation functionality
* Add reporting and statistics features
