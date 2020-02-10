import { Component, OnInit, OnDestroy } from '@angular/core';
import { IQuestion, NumberAnswer } from '../../models/question.model';
import { Observable, BehaviorSubject, Subscription } from 'rxjs'; // TODO
import { sampleOrgReview, sampleTheaterReview } from '../../models/sample-questions';
import { IReview } from '../../models/review.model';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  review: IReview;
  question: IQuestion; // current question
  questionCount: number;
  questionIndex: BehaviorSubject<number> = new BehaviorSubject(0);
  anyAnswerSelected = false;
  selectedAnswer: number = undefined;
  title: string;
  showProgress = true;
  progressVal: number;
  progressMax: number;
  submitText: string;
  answerDirection = 'column'; // FlexboxLayout flexDirection
  subs: Subscription[] = [];
  firstQuestion = true;
  lastQuestion = false;

  constructor(private log: LogService) { }

  ngOnInit() {
    this.title = 'Review';
    this.review = sampleTheaterReview;
    this.questionCount = this.review.questions.length;
    this.progressMax = this.questionCount;
    // Update dynamically from index change
    this.subs.push(this.questionIndex.asObservable().subscribe(qIndex => {
      this.firstQuestion = (qIndex === 0);
      this.progressVal = qIndex + 1;
      this.question = this.review.questions[qIndex];
      if (this.question.answers[0] instanceof NumberAnswer) {
        this.answerDirection = 'row';
      } else {
        this.answerDirection = 'column';
      }
      this.lastQuestion = qIndex === this.questionCount - 1;
      this.log.verbose(`Question index updated to ${qIndex}.`);
      if (this.lastQuestion) {
        this.submitText = 'Finish';
      } else {
        this.submitText = 'Next';
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  setSelectedAnswer(answerNum: number) {
    this.log.verbose(`Answer ${answerNum} selected.`);
    this.selectedAnswer = answerNum;
    this.anyAnswerSelected = true;
  }

  getAnswerClasses(answerNum: number) {
    const selected = this.anyAnswerSelected && answerNum === this.selectedAnswer;
    this.log.verbose('answerClasses run, selected ' + selected);
    return { selected: selected, unselected: !selected };
  }

  previousQuestion() {
    if (this.firstQuestion) { return; }
    this.questionIndex.next(this.questionIndex.value - 1);
  }

  doneQuestion() {
    if (this.lastQuestion) {
      // Submit
    } else {
      this.questionIndex.next(this.questionIndex.value + 1);
    }
  }

}
