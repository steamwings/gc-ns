import { Component, OnInit } from '@angular/core';
import { IQuestion, IAnswer } from '../../models/question.model';
import { Observable } from 'rxjs'; //TODO
import { sampleOrgReview } from '../../models/sample-questions';
import { IReview } from '../../models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  review: IReview;
  question: IQuestion; // current question
  questionCount: number;
  questionIndex: number = 0;
  anyAnswerSelected: boolean = false;
  selectedAnswer: number = undefined;
  title: string;
  showProgress: boolean = true;

  constructor() { }

  ngOnInit() {
    this.title = "Review";
    this.review = sampleOrgReview;
    this.questionCount = this.review.questions.length;
  }

  setSelectedAnswer(answerNum: number) {
    this.selectedAnswer = answerNum;
  }

  getAnswerClasses(answerNum: number) {
    var selected = this.anyAnswerSelected && answerNum == this.selectedAnswer;
    return { selected: selected, unselected: !selected };
  }

  private nextQuestion() {

  }

}
