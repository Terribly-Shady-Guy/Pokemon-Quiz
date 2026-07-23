import { useState } from "react";

import { questions } from "./questions.json.ts";
import { useQuizStore } from "./store";
import { QuestionCard } from "./QuestionCard";


export function QuizView() {
    const questionInfoLength = useQuizStore(state => state.questionInfo.length);
    const setQuizStatus = useQuizStore(state => state.setQuizStatus);

    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
    const shouldBeDisabled = currentQuestionNumber >= questionInfoLength + 1;

    const toNextQuestionOrFinish = () => {
        if (currentQuestionNumber >= questions.length) {
            setQuizStatus("finished");
            return;
        }

        setCurrentQuestionNumber(state => state + 1);
    }
    
    return (
        <div>
            <QuestionCard question={questions[currentQuestionNumber - 1]} questionNumber={currentQuestionNumber}></QuestionCard>
            <button type="button" onClick={toNextQuestionOrFinish} disabled={shouldBeDisabled}>
                {currentQuestionNumber >= questions.length ? "Finish" : "Next Question"}
            </button>
        </div>
    );
}
