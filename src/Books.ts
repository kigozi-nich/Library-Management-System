export class Book {
    constructor(
        public id: number,
        public title: string,
        public available: boolean = true
    ) {}

    displayInfo(): void {
        console.log(
            `ID: ${this.id} | Title: ${this.title} | Available: ${this.available}`
        );
    }
}