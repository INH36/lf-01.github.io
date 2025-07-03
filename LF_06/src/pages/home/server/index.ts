import http from "@/utils/request/http";

export const getProducts = async () => {
    const res = await http.get('/shop');
    return res.data;
}