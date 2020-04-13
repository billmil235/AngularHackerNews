export interface Base {
    id: number,
    deleted: boolean,
    type: string,
    by: string,
    time: number, 
    dead: boolean,
    kids: Array<number>
}