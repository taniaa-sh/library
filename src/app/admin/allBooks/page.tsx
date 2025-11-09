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
        <div className="bg-[#F8F8FF] px-6 py-6">
            <div className="flex flex-col gap-6 bg-white py-6 px-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <p className="font-medium text-xl">All Books</p>
                    <AddBookBtn />
                </div>
                <AllBooksTableClient data={data} />
            </div>
        </div>
    );
};

export default AllBooksPage;