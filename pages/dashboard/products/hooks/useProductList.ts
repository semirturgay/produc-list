import {useQuery} from "react-query";
import axios from "axios";

const getProducts = async () => {
    const {data} = await axios.get(
        "/api/dashboard/products"
    );
    return data;
};

export default function useProductList() {
    return useQuery("products", getProducts);
}
