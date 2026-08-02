import { type MouseEvent } from "react";
import { useShallow } from "zustand/shallow";

import { useQuizStore, type QuizQuestionDetail } from "./store"
import { Timer } from "./Timer";
import { type Question } from "./questions.json.ts";


interface QuestionCardProps {
    question: Question
    questionNumber: number
}

export function QuestionCard({ question, questionNumber }: QuestionCardProps) {
    const store = useQuizStore(useShallow(state => ({
        insertQuestionInfo: state.insertQuestionInfo,
        questionInfo: state.questionInfo
    })));

    const currentQuestionInfo = store.questionInfo.at(-1);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            const button = event.currentTarget;

            const newQuestionDetail: QuizQuestionDetail = {
                questionNumber: questionNumber,
                correctAnswer: question.answer,
                userAnswer: button.value
            };

            store.insertQuestionInfo(newQuestionDetail);
        };

    const handleTimeout = () => {
        const newQuestionDetail: QuizQuestionDetail = {
            questionNumber: questionNumber,
            correctAnswer: question.answer,
            userAnswer: null
        };

        store.insertQuestionInfo(newQuestionDetail);
    };

    const shouldBeDisabled = currentQuestionInfo?.questionNumber === questionNumber;
    const selectionButtons = question.selections.map(selection => (
        <button type="button" key={selection.label} value={selection.label} onClick={handleClick} disabled={shouldBeDisabled}>
            {selection.label}. {selection.value}
        </button>
    ));

    return (
        <>
            <Timer key={questionNumber} timeoutSeconds={60} onTimeout={handleTimeout} isDisabled={shouldBeDisabled} />
            <p>{questionNumber}. {question.question}</p>
            <div>
                {selectionButtons}
            </div>
        </>
    );
}
