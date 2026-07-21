import rawQuestionsJson from "./questions.json" with { type: "json" };

export interface AnswerSelection {
    label: string
    value: string
}

export interface Question {
    question: string
    answer: string
    selections: AnswerSelection[]
};

export const questions = rawQuestionsJson satisfies Question[];