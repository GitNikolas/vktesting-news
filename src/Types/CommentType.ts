export interface CommentType {
    by: string;
    id: number;
    kids: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
}