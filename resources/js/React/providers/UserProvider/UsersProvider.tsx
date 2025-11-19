import React, { useMemo, useReducer } from "react";
import { UsersContextValues, UsersProviderProps } from "./users.types";
import { usersReducer } from "./usersReducer";
import UsersContext from "./UsersContext";

const initialState = {
    currentPage: 1,
    loading: false
};

export default function UsersProvider({ children }: UsersProviderProps) {

    const [state, dispatch] = useReducer(usersReducer, initialState);

    const api = useMemo<UsersContextValues>(() => ({
        state: state,
        changeData: (data) => dispatch({ type: "changeUsers", payload: data }),
        changePage: (page) => dispatch({ type: "changePage", payload: page }),
        setLoading: (loading) => dispatch({ type: "setLoading", payload: loading })
    }), [state]);

    return <UsersContext value={api}>{children}</UsersContext>;

}