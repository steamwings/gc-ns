import { IModel } from "./model.model";
import { IPartyRef } from "./party.model";

/**
 * A blurb is a short description written by a user about something specific
 * It's once piece when a user completes a review
 */
export interface IBlurb extends IModel {
    id: number;
    val: string;
    ref: IPartyRef;
}

export class Blurb implements IBlurb {
    id: number;
    val: string;
    ref: IPartyRef;
    constructor(val: string /*, ref: IPartyRef TODO */){
        this.val = val;
    }
}