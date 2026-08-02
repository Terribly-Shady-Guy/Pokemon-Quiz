import { useState } from "react";
import { useShallow } from "zustand/shallow";

import { questions } from "./questions.json.ts";
import { useQuizStore } from "./store";
import { QuestionCard } from "./QuestionCard";

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

    const currentQuestion = questions.at(currentQuestionNumber - 1);
    const isQuestionUnavailable = currentQuestion === undefined;
    
    return (
        <div>
            {isQuestionUnavailable ? 
            <p>Failed to retrieve question details.</p> 
            : 
            <QuestionCard question={currentQuestion} questionNumber={currentQuestionNumber} />}
            <button type="button" onClick={toNextQuestionOrFinish} disabled={shouldBeDisabled || isQuestionUnavailable}>
                {currentQuestionNumber >= questions.length ? "Finish" : "Next Question"}
            </button>
        </div>
    );
}
