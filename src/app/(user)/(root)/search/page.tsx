import SearchBook from "./_components/SearchBook";

const fetchBooks = async () => { 
    await new Promise((r) => setTimeout(r, 500));
        return [
        "Harry Potter",
        "The Hobbit",
        "Atomic Habits",
        "Clean Code",
        "The Alchemist",
        "The Great Gatsby",
        "To Kill a Mockingbird",
    ];
};

const SearchBooksPage = async () => {
    const data = await fetchBooks();
    return (
        <SearchBook data={data} />
    );
};

export default SearchBooksPage;