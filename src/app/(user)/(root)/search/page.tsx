import SearchBook from "./_components/SearchBook";

const SearchBooksPage = async () => {

    async function fakeFetch() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    await fakeFetch();

    return <SearchBook />;

}

export default SearchBooksPage