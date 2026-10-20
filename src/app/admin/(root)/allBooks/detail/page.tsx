import { fetchData } from '@/utils/utils';
import DetailBookPage from '../_components/DetailBookPage';
import { Axios_Route } from '@/utils/axiosRoutes';
import { AxiosMethodEnum } from '@/utils/type';
import { notFound } from 'next/navigation';

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
    searchParams: Promise<{ id?: string }>;
}

const fetchBookDetails = async (id: string): Promise<Book> => {
  return fetchData<undefined, Book>({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    apiRoute: `${Axios_Route.bookDetail}/${id}`,
    method: AxiosMethodEnum.get,
  });
};

const DetailBook = async ({ searchParams }: Props) => {
    const { id } = await searchParams;

    if (!id) {
        notFound();
    }

    const data = await fetchBookDetails(id);
    console.log("yyyyyyyyy",data);

    return (
        <div className="bg-light-300 dark:bg-dark-900 px-8 py-10 w-full min-h-dvh">
            <div className="flex flex-col gap-6 bg-white dark:bg-dark-900 py-6 px-5 rounded-lg min-h-dvh">
                <DetailBookPage data={data} />
            </div>
        </div>
    );
};

export default DetailBook;