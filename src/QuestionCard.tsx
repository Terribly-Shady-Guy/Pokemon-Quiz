import  type { MouseEvent } from "react";
import { useShallow } from "zustand/shallow";

import { useQuizStore, type QuizQuestionDetail } from "./store"
import { Timer } from "./Timer";
import { type Question } from "./questions.json.ts";

interface QuestionCardProps {
    question: Question;
    questionNumber: number;
};

export function QuestionCard({ question, questionNumber }: QuestionCardProps) {
    const store = useQuizStore(useShallow(state => ({
        questionInfo: state.questionInfo,
        insertInfo: state.insertQuestionInfo,
    })));

    const currentQuestionInfo = store.questionInfo
        .find(info => info.questionNumber === questionNumber);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;

        const newQuestionDetail: QuizQuestionDetail = {
            questionNumber: questionNumber,
            correctAnswer: question.answer,
            userAnswer: button.value
        };

        store.insertInfo(newQuestionDetail);
    };

    const handleTimeout = () => {
        const newQuestionDetail: QuizQuestionDetail = {
            questionNumber: questionNumber,
            correctAnswer: question.answer,
            userAnswer: null
        };

        store.insertInfo(newQuestionDetail);
    };

    const shouldBeDisabled = currentQuestionInfo !== undefined;
    const selectionButtons = question.selections.map(selection => (
        <button type="button" key={selection.label} value={selection.label} onClick={handleClick} disabled={shouldBeDisabled}>
            {selection.label}. {selection.value}
        </button>
    ));

    return (
        <div>
            <Timer timeoutSeconds={60} onTimeout={handleTimeout} isDisabled={shouldBeDisabled}></Timer>
            <p>{questionNumber}. {question.question}</p>
            <div>
                {selectionButtons}
            </div>
        </div>
    );
}
