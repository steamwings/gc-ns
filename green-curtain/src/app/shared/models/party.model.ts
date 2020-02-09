import { IRef } from "./ref.model";


export interface IPartyRef extends IRef { }

/**
 * Interface for any party (in the *legal* sense)
 */
export interface IParty extends IPartyRef {
    id: number;
    name: string,
    parent: IPartyRef;
    children: IParty[];
}