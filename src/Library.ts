import { promises as fs } from "fs";
import path from "path";
import { Book } from "./Books";

/**
 * Manages a collection of books and handles persistence to disk.
 */
export class Library {
    private books: Book[] = [];
    private readonly dataFile = path.join(process.cwd(), "library-data.json");

    /**
     * Loads the list of books from the JSON data file.
     * If the file does not exist or cannot be read, starts with an empty list.
     */
    async loadBooks(): Promise<void> {
        try {
            const data = await fs.readFile(this.dataFile, "utf8");
            const parsed = JSON.parse(data) as Array<{ id: number; title: string; available: boolean }>;
            this.books = parsed.map(item => new Book(item.id, item.title, item.available));
        } catch {
            this.books = [];
        }
    }

    /**
     * Saves the current list of books to the JSON data file.
     */
    async saveBooks(): Promise<void> {
        await fs.writeFile(this.dataFile, JSON.stringify(this.books, null, 2), "utf8");
        console.log("Library saved successfully.");
    }

    /**
     * Adds a new book to the library.
     * @param book - The book instance to add.
     * @throws Error if a book with the same ID already exists.
     */
    addBook(book: Book): void {
        const exists = this.books.some(existing => existing.id === book.id);
        if (exists) {
            throw new Error("A book with this ID already exists.");
        }

        this.books.push(book);
        console.log("Book added successfully.");
    }

    /**
     * Displays each book currently stored in the library.
     */
    displayBooks(): void {
        if (this.books.length === 0) {
            console.log("No books in the library.");
            return;
        }

        this.books.forEach(book => book.displayInfo());
    }

    /**
     * Searches for a book title using recursion.
     * @param title - The search string to match against book titles.
     * @returns The first matching book, or undefined if none found.
     */
    recursiveSearch(title: string): Book | undefined {
        const normalizedTitle = title.toLowerCase();

        const search = (books: Book[]): Book | undefined => {
            if (books.length === 0) {
                return undefined;
            }

            const [first, ...rest] = books;
            if (!first) {
                return undefined;
            }

            if (first.title.toLowerCase().includes(normalizedTitle)) {
                return first;
            }

            return search(rest);
        };

        return search(this.books);
    }

    /**
     * Marks a book as borrowed if it is available.
     * @param id - The ID of the book to borrow.
     * @throws Error if the book isn't found or is already borrowed.
     */
    borrowBook(id: number): void {
        const book = this.books.find(item => item.id === id);
        if (!book) {
            throw new Error("Book not found.");
        }

        if (!book.available) {
            throw new Error("Book is already borrowed.");
        }

        book.available = false;
        console.log(`Book "${book.title}" borrowed successfully.`);
    }

    /**
     * Marks a book as returned if it is currently borrowed.
     * @param id - The ID of the book to return.
     * @throws Error if the book isn't found or is already available.
     */
    returnBook(id: number): void {
        const book = this.books.find(item => item.id === id);
        if (!book) {
            throw new Error("Book not found.");
        }

        if (book.available) {
            throw new Error("Book is already available.");
        }

        book.available = true;
        console.log(`Book "${book.title}" returned successfully.`);
    }
}
