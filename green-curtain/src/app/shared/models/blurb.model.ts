import { IRef } from "./ref.model";
import { IModel } from "./model.model";
import { IIdentityRef } from "./user.model";

/**
 * A blurb is a short description written by a user about something specific
 * It's once piece when a user completes a review
 */
export interface IBlurb extends IModel {
    id: number;
    val: string;
    ref: IIdentityRef;
}

export class Blurb implements IBlurb {
    id: number;
    val: string;
    ref: IIdentityRef;
}