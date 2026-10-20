import AllBooksTableClient from "./_components/AllBooksTableClient";
import AddBookBtn from "./_components/AddBookBtn";
import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";

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
const AllBooksPage = async () => {
    const data = await fetchBooks();

    return (
      <div className="bg-light-300 dark:bg-dark-900 px-8 py-10 !mt-[130px] md:!mt-[70px] w-full min-h-dvh">
            <div className="flex flex-col gap-6 bg-white dark:bg-dark-900 py-6 px-5 rounded-lg min-h-dvh">
                <div className="flex justify-between items-center !max-w-[1440px]">
                    <p className="font-medium text-md md:text-xl dark:text-white">All Books</p>
                    <AddBookBtn />
                </div>
                <AllBooksTableClient data={data} />
            </div>
        </div>
    );
};

export default AllBooksPage;