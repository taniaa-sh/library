import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";
import BookDetailClient from "../_components/BookDetailClient";

interface Review {
    _id: string;
    bookId: string;
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

interface BookDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

const fetchReviews = async (): Promise<Review[]> => {
    return fetchData<undefined, Review[]>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
        apiRoute: Axios_Route.getAllReviews,
        method: AxiosMethodEnum.get,
    });
};

export default async function BookDetailPage({
    params,
}: BookDetailPageProps) {
    const { id: bookId } = await params;

    const reviewsData = await fetchReviews();

    return (
        <BookDetailClient
            bookId={bookId}
            data={reviewsData}
        />
    );
}