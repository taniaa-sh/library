'use client';

import BookFeature from "@/components/BookFeature";
import PopularBookSlider from "@/components/PopularBookSlider";
import imagesAddresses from "@/utils/imageAddresses";
import { BookFeatureProps } from "@/utils/type";
import { useEffect, useState } from "react";

const Home = () => {

    const [data, setData] = useState<BookFeatureProps[]>([]);

    useEffect(() => {
        fetch('/data/data.json')
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error('خطا در خواندن JSON:', err));
    }, []);

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
                    totalBooks={10}
                    availableBooks={4}
                />
            </div>
            <div className="flex flex-col gap-12 mt-20">
                <p className="text-3xl font-semibold text-light-100">Popular Books</p>
                <PopularBookSlider data={data} />
            </div>
        </>
    );
};

export default Home;