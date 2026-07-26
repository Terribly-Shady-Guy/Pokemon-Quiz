import { useState } from "react";

import { questions } from "./questions.json.ts";
import { useQuizStore } from "./store";
import { QuestionCard } from "./QuestionCard";
import { useShallow } from "zustand/shallow";


export function QuizView() {
    const store = useQuizStore(useShallow(state => ({
        numQuestionsCompleted: state.questionInfo.length,
        setQuizStatus: state.setQuizStatus
    })));


    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
    const shouldBeDisabled = currentQuestionNumber >= store.numQuestionsCompleted + 1;

    const toNextQuestionOrFinish = () => {
        if (currentQuestionNumber >= questions.length) {
            store.setQuizStatus("finished");
            return;
        }

        setCurrentQuestionNumber(state => state + 1);
    }
    
    return (
        <div>
            <QuestionCard question={questions[currentQuestionNumber - 1]} questionNumber={currentQuestionNumber} />
            <button type="button" onClick={toNextQuestionOrFinish} disabled={shouldBeDisabled}>
                {currentQuestionNumber >= questions.length ? "Finish" : "Next Question"}
            </button>
        </div>
    );
}
