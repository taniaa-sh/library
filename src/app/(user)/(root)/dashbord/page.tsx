import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";
import DashbordComponent from "./_components/DashbordComponent";

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

interface BooksApiResponse {
    success: boolean;
    count: number;
    data: Book[];
}

const fetchAllBookLatest = async (): Promise<Book[]> => {
    const response = await fetchData<undefined, BooksApiResponse>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
        apiRoute: Axios_Route.allBookLatest,
        method: AxiosMethodEnum.get,
    });

    return response.data ?? [];
};

const DashboardPage = async () => {
    const data = await fetchAllBookLatest();

    return <DashbordComponent data={data} />;
};

export default DashboardPage;