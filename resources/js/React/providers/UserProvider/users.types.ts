import { ListApi, UserModel } from "@app/js/app.types";

type ChangeUsersAction = {
    type: "changeUsers";
    payload?: UsersDataValue;
}

type ChangePageAction = {
    type: "changePage";
    payload: number;
}

type SetLoadingAction = {
    type: "setLoading";
    payload: boolean;
}

type UsersDataValue = ListApi<UserModel> | "error";

export type UsersProviderProps = {
    children: React.ReactNode
}

export type UsersContextValues = {
    state: UsersState
    changeData: (data?: UsersDataValue) => void;
    changePage: (page: number) => void;
    setLoading: (loading: boolean) => void;
}

export type UsersState = {
    data?: UsersDataValue;
    currentPage: number;
    loading: boolean;
}

export type UsersActions = ChangeUsersAction | ChangePageAction | SetLoadingAction;