import { IParty } from '../party/party.model';
import { IQuestion } from './question.model';

export interface IReview {
    readonly questions: IQuestion[];
    reviewee: IParty;
    reviewer: IParty;
}

export class BasicReview implements IReview {
    readonly questions: IQuestion[];
    /** The party completing the review */
    reviewer: IParty = undefined;
    /** The party under review */
    reviewee: IParty = undefined;
    constructor(questions: IQuestion[]) {
        this.questions = questions;
    }
}
