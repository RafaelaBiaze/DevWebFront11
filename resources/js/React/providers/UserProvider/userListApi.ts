import { ListApi, UserModel } from "@app/js/app.types";
import { baseAxios } from "../axiosApi";
import catchError from "../catchError";

export default async function userListApi(page = 1, limit = 15, orderBy = "id,desc") {

    const query = new URLSearchParams({
        "page": page.toString(),
        "orderBy": orderBy,
        "limit": limit.toString()
    });

    try {
        const { data } = await baseAxios.get<ListApi<UserModel>>(`api/users?${query}`);

        return data;
    } catch (error) {
        return catchError(error);
    }
}