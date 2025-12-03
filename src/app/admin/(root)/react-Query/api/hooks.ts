import { getProducts } from "./endpoint";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
    return useQuery({
        queryKey: ["getProducts"],
        queryFn: getProducts
    })
}