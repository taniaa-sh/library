import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";
import SearchBook from "./_components/SearchBook";

interface Book {
    _id: string;
    id: number;
    title: string;
    author: string;
    genre: string;
    bookVideo: string;
    bookPrimaryColor: string;
    bookImage: string;
    totalNumberOfBooks: number;
    description: string;
    bookPdf: string;
    createdAt: string;
    updatedAt: string;
}

const fetchBooks = async (): Promise<Book[]> => {
    return await fetchData<undefined, Book[]>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
        apiRoute: Axios_Route.allBook,
        method: AxiosMethodEnum.get,
    });
};
const SearchBooksPage = async () => {
    const data = await fetchBooks();

    return (
        <SearchBook data={data} />
    );
};

export default SearchBooksPage;