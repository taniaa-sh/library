import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";
import BookDetailClient from "../_components/BookDetailClient";
import { notFound } from "next/navigation";

interface Review {
    _id: string;
    bookId: number;
    userId:
    | {
        _id: string;
        fullName: string;
    }
    | string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

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

interface Props {
    params: Promise<{
        id: string;
    }>;
}

const fetchReviews = async (bookId: number): Promise<Review[]> => {
    return fetchData<undefined, { success: boolean; data: Review[] }>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
        apiRoute: `${Axios_Route.getAllReviews}/${bookId}`,
        method: AxiosMethodEnum.get,
    }).then((response) => response.data);
};

const fetchBookDetails = async (id: string): Promise<Book> => {
    return fetchData<undefined, Book>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
        apiRoute: `${Axios_Route.bookDetail}/${id}`,
        method: AxiosMethodEnum.get,
    });
};

export default async function BookDetailPage({ params }: Props) {
    const { id } = await params;

    const bookId = Number(id);

    if (!Number.isInteger(bookId) || bookId <= 0) {
        notFound();
    }

    const bookData = await fetchBookDetails(id);

    if (!bookData) {
        notFound();
    }

    const reviewsData = await fetchReviews(bookData.id);

    return (
        <BookDetailClient
            bookId={bookData.id}
            data={reviewsData}
            book={bookData}
        />
    );
}