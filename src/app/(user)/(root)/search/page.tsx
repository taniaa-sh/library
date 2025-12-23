import SearchBook from "./_components/SearchBook";

const fetchBooks = async ({
    search,
}: {
    search?: string;
}) => {
    await new Promise((r) => setTimeout(r, 500));

    const allBooks = [
        "Harry Potter",
        "The Hobbit",
        "Atomic Habits",
        "Clean Code",
        "The Alchemist",
        "The Great Gatsby",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
        "To Kill a Mockingbird",
    ];

    if (!search) return allBooks;

    return allBooks.filter((book) =>
        book.toLowerCase().includes(search.toLowerCase())
    );
};

const SearchBooksPage = async ({
    searchParams,
}: {
    searchParams: { search?: string };
}) => {

    return <SearchBook />;
};

export default SearchBooksPage;