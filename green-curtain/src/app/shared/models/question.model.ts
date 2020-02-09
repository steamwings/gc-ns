
export interface IAnswer {
    readonly value;
    readonly id: number;
}

export class TextAnswer implements IAnswer {
    readonly value: string;
    readonly id: number;
    constructor(text: string, id: number = 0) {
        this.value = text;
        this.id = id;
    }
}

export class NumberAnswer implements IAnswer {
    readonly value: number;
    readonly id: number;
    constructor(val: number, id: number = 0) {
        this.value = val;
        this.id = id;
    }
}

export interface IQuestion {
    prompt: string;
    answers: IAnswer[];
    answerCount: number;
}

abstract class BaseQuestion implements IQuestion {
    prompt: string;
    answers: IAnswer[];
    readonly answerCount: number;
    constructor(prompt: string){
        this.prompt = prompt;
    }
}

export class YesNoQuestion extends BaseQuestion {
    readonly answers: TextAnswer[];
    readonly answerCount: number = 2;
    constructor(prompt: string, yesText: string = "Yes", noText: string = "No") {
        super(prompt);
        this.answers = [new TextAnswer(yesText), new TextAnswer(noText)];
    }
}

/**
 * This is intended to generate an integer-only list of small number options,
 * always starting with 1.
 */
export class RatingQuestion extends BaseQuestion {
    prompt: string;
    readonly answers: NumberAnswer[];
    readonly answerCount: number;
    constructor(prompt: string, scaleMax: number = 5) {
        super(prompt);
        this.answers = Array.from({length: scaleMax}, (_,i) => new NumberAnswer(i+1));
    }
}

export class MultipleChoiceQuestion extends BaseQuestion {
    prompt: string;
    private _answers: TextAnswer[];
    private _answerCount: number;

    // constructor(prompt: string, answers: string[]){
    //     super(prompt);
    //     this.answers = answers.map(x => new TextAnswer(x));
    // }

    get answers(): TextAnswer[] { return this._answers; }
    set answers(val: TextAnswer[]) {
        this._answers = val;
        this._answerCount = val.length;
    }

    get answerCount(): number { return this._answerCount; }
}
