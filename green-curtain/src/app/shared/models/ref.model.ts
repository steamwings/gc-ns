import { IModel } from "./model.model";

export interface IRef extends IModel {
    name: string
}

export class Ref implements IRef {
    id: number;
    name: string
}