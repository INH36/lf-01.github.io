import http from "../../utils/request/http";
import { repositories } from "../type";



export const gitHotRepositories = async (params:repositories) => {
    const res = await http.get('/search/repositories', {params})
    return res.data
}