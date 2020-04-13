import { Base } from './Base';

export interface Story extends Base {
    descendents: number, 
    score: number,
    title: string,
    url: string
}