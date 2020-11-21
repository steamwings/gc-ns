import { IRef } from "../ref.model";


export interface IPartyRef extends IRef { }

/**
 * Interface for any user or org: any party in the legal sense
 */
export interface IParty extends IPartyRef {
    description: string;
}