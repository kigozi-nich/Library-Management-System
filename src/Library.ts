import { promises as fs } from "fs";
import path from "path";
import { Book } from "./Books";

export class Library {
    private books: Book[] = [];
    private readonly dataFile = path.join(process.cwd(), "library-data.json");

    async loadBooks(): Promise<void> {
        try {
            const data = await fs.readFile(this.dataFile, "utf8");
            const parsed = JSON.parse(data) as Array<{ id: number; title: string; available: boolean }>;
            this.books = parsed.map(item => new Book(item.id, item.title, item.available));
        } catch {
            this.books = [];
        }
    }

    async saveBooks(): Promise<void> {
        await fs.writeFile(this.dataFile, JSON.stringify(this.books, null, 2), "utf8");
        console.log("Library saved successfully.");
    }

    addBook(book: Book): void {
        const exists = this.books.some(existing => existing.id === book.id);
        if (exists) {
            throw new Error("A book with this ID already exists.");
        }

        this.books.push(book);
        console.log("Book added successfully.");
    }

    displayBooks(): void {
        if (this.books.length === 0) {
            console.log("No books in the library.");
            return;
        }

        this.books.forEach(book => book.displayInfo());
    }

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
