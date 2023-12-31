import { Movie } from "./movie";

export interface User{
    username:string,
    email: string,
    password: string,
    rePassword: string,
    _id: string,
    movies: Movie[],
}