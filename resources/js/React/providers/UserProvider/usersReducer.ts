import { UsersActions, UsersState } from "./users.types";

export function usersReducer(
    state: UsersState,
    action: UsersActions
): UsersState {
    switch (action.type) {
        case "changeUsers":
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case "changePage":
            return {
                ...state,
                currentPage: action.payload
            };
        case "setLoading":
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}