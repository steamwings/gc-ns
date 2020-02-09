import { MultipleChoiceQuestion, TextAnswer, YesNoQuestion } from "./question.model";
import { IReview, BasicReview } from "./review.model";



const qFairComp = new YesNoQuestion("Does this organization provide fair compensation?");
const qProductionType = new MultipleChoiceQuestion("What type of production did you contribute to?");

export const sampleTheaterReview: IReview = new BasicReview([qFairComp]);
export const sampleOrgReview : IReview = new BasicReview([qFairComp]);