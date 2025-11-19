import { createContext } from "react";
import { UsersContextValues } from "./users.types";

export default createContext<UsersContextValues | null>(null);