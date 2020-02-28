import { MultipleChoiceQuestion, YesNoQuestion, RatingQuestion } from './question.model';
import { IReview, BasicReview } from './review.model';

// const prodTypeAnswers = ['Staged Reading (scripts in-hand)', 'Workshop', 'Full Production'];
const prodTypeAnswers = ['Staged Reading (scripts in-hand)', 'Workshop', 'Full Production', 'Fake news',
'Mall cop', 'This is not a show', 'The Matrix', 'Oh Domino', 'Hey Pachuco', 'value', 'last value'];
const prodTypePrompt = 'What type of production did you contribute to?';
const timeToReviewContractPrompt = 'Were you given sufficient time to review contractual documents before signing?';
const fairCompPrompt = 'How would you rate the level of compensation? (10 is best)';

const qTimeToReviewContract = new YesNoQuestion(timeToReviewContractPrompt);
const qFairComp = new RatingQuestion(fairCompPrompt, 5);
const qProductionType = new MultipleChoiceQuestion(prodTypePrompt, prodTypeAnswers);

export const sampleTheaterReview: IReview = new BasicReview([qProductionType, qTimeToReviewContract, qFairComp]);
export const sampleOrgReview: IReview = new BasicReview([qTimeToReviewContract, qFairComp]);
