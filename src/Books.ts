/**
 * Represents a book in the library.
 */
export class Book {
    /**
     * Creates a new Book instance.
     * @param id - The unique numeric identifier for the book.
     * @param title - The title of the book.
     * @param available - Whether the book is available to borrow.
     */
    constructor(
        public id: number,
        public title: string,
        public available: boolean = true
    ) {}

    /**
     * Displays the book's information in the console.
     */
    displayInfo(): void {
        console.log(
            `ID: ${this.id} | Title: ${this.title} | Available: ${this.available}`
        );
    }
}