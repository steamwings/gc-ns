
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
    // TODO id and version?
    readonly prompt: string;
    readonly answers: IAnswer[];
    readonly answerCount: number;
}

abstract class BaseQuestion implements IQuestion {
    readonly prompt: string;
    readonly answers: IAnswer[];
    readonly answerCount: number;
    constructor(prompt: string, answers: IAnswer[]) {
        this.prompt = prompt;
        this.answers = answers;
        this.answerCount = answers.length;
    }
}

export class YesNoQuestion extends BaseQuestion {
    constructor(prompt: string, yesText: string = 'Yes', noText: string = 'No') {
        super(prompt, [new TextAnswer(yesText), new TextAnswer(noText)]);
    }
}

/**
 * This is intended to generate an integer-only list of small number options,
 * always starting with 1.
 */
export class RatingQuestion extends BaseQuestion {
    constructor(prompt: string, scaleMax: number = 5) {
        super(prompt, Array.from({ length: scaleMax }, (_, i) => new NumberAnswer(i + 1)));
    }
}

export class MultipleChoiceQuestion extends BaseQuestion {
    constructor(prompt: string, answers: string[]){
        super(prompt, answers.map(x => new TextAnswer(x)));
    }
}
