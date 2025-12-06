"use client";

import { ProductType } from "./api/apiTypes";
import { useGetProducts } from "./api/hooks";

const ReactQuery = () => {

    const { data } = useGetProducts();

    return (
        <div className="bg-light-300 px-6 py-6 !mt-[100px]">
            <div className="flex flex-col gap-6 bg-white py-6 px-5 rounded-lg">
                <p className="font-medium text-xl">Account Registration Requests</p>
                <div>{data?.map((item: ProductType) => item.title)}</div>
            </div>
        </div>
    );
};

export default ReactQuery;
