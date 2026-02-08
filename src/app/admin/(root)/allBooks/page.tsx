import AllBooksTableClient from "./_components/AllBooksTableClient";
import AddBookBtn from "./_components/AddBookBtn";

const fetchUsers = async () => {

    await new Promise((r) => setTimeout(r, 500));
    return [
        {
            bookTitle: 'The Great Reclamation: A Novel by',
            author: 'Rachel Hxeng',
            genre: 'Strategic, Fantasy',
            dateCreated: 'Dec 19 2023',
            action: '',
        },
        {
            bookTitle: 'Inside Evil: Inside Evil Series, Book 1',
            author: 'Rachel Hxeng',
            genre: 'Strategic, Fantasy',
            dateCreated: '1',
            action: '',
        },
        {
            bookTitle: 'Jayne Castle - People in Glass Houses',
            author: 'Rachel Hxeng',
            genre: 'Strategic, Fantasy',
            dateCreated: 'Dec 19 2023',
            action: '',
        },
    ];
};

const AllBooksPage = async () => {
    const data = await fetchUsers();

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