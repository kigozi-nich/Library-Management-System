/**
 * Entry point for the console-based Library Management System.
 */
import { Library } from "./Library";
import { Book } from "./Books";
import readline from "readline";

const library = new Library();

let rl: readline.Interface | undefined;

/**
 * Returns a cached readline interface, creating it if needed.
 */
function getReadlineInterface(): readline.Interface {
    if (!rl) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    return rl;
}

/**
 * Closes the readline interface when the application exits.
 */
function closeReadline(): void {
    if (rl) {
        rl.close();
        rl = undefined;
    }
}

/**
 * Prompts the user with a question and returns their input.
 * @param question - The prompt text shown to the user.
 */
function ask(question: string): Promise<string> {
    return new Promise(resolve =>
        getReadlineInterface().question(question, resolve)
    );
}

/**
 * Main menu loop that displays options and handles user commands.
 */
async function menu(): Promise<void> {

    await library.loadBooks();

    while (true) {

        console.log("\n========================");
        console.log("Library Management System");
        console.log("========================");
        console.log("1. Add Book");
        console.log("2. Display Books");
        console.log("3. Search Book");
        console.log("4. Borrow Book");
        console.log("5. Return Book");
        console.log("6. Save Library");
        console.log("7. Exit");

        const choice = await ask(
            "Choose option: "
        );

        try {

            switch (choice) {

                case "1":

                    const id = Number(
                        await ask("Book ID: ")
                    );

                    const title = await ask(
                        "Book Title: "
                    );

                    library.addBook(
                        new Book(id, title)
                    );
                    await library.saveBooks();

                    break;

                case "2":

                    library.displayBooks();

                    break;

                case "3":

                    const searchTitle =
                        await ask(
                            "Enter title: "
                        );

                    const result =
                        library.recursiveSearch(
                            searchTitle
                        );

                    if (result) {
                        result.displayInfo();
                    } else {
                        console.log(
                            "Book not found."
                        );
                    }

                    break;

                case "4":

                    library.borrowBook(
                        Number(
                            await ask(
                                "Book ID: "
                            )
                        )
                    );
                    await library.saveBooks();

                    break;

                case "5":

                    library.returnBook(
                        Number(
                            await ask(
                                "Book ID: "
                            )
                        )
                    );
                    await library.saveBooks();

                    break;

                case "6":

                    await library.saveBooks();

                    break;

                case "7":

                    await library.saveBooks();

                    closeReadline();

                    return;

                default:

                    console.log(
                        "Invalid choice."
                    );
            }
        }
        catch (error) {

            if (error instanceof Error) {
                console.log(
                    `Error: ${error.message}`
                );
            }
        }
    }
}

async function main(): Promise<void> {
    await menu();
}

main().catch(error => {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    }
    process.exitCode = 1;
});