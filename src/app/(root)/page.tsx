import BookFeature from "@/components/BookFeature";
import PopularBookSlider from "@/components/PopularBookSlider";
import imagesAddresses from "@/utils/imageAddresses";

const Home = async () => {


    return (
        <>
            <div className="flex flex-col gap-10 mt-20">
                <BookFeature
                    title="The Lord"
                    Genre="Fantasy"
                    author="J.R.R. Tolkien"
                    rating={4.8}
                    description={"The Lord of the Rings is a novel by English author and scholar J. R. R. Tolkien."}
                    bookImg={imagesAddresses.images.book1}
                    bookBlurImg={imagesAddresses.images.book1blur}
                    totalBooks={10}
                    availableBooks={4}
                />
            </div>
            <div className="flex flex-col gap-12 mt-20">
                <p className="text-3xl font-semibold text-light-100">Popular Books</p>
                <PopularBookSlider />
            </div>
        </>
    );
};

export default Home;