import IAuthor from "./author";
import IComments from "./comments";

interface IPosts {
    userId: number;
    id: number;
    title: string;
    body: string;
    author: IAuthor;
    isVisible: boolean;
    comments: IComments[];
}

export default IPosts