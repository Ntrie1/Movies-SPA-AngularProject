import { UserId } from "./userId";

 export interface Movie{
    _id: string,
    title: string,
    description: string,
    image: string,
    genre: string,
    userId: UserId,
    date: string,
    bookmarkedBy?: string; 
    __v: number;
 }