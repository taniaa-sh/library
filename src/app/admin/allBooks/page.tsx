import AllBooksTableClient from "./_components/AllBooksTableClient";
import AddBookBtn from "./_components/AddBookBtn";

async function fetchBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch books");
    }

    return res.json();
}

const AllBooksPage = async () => {
    const data = await fetchBooks();

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
