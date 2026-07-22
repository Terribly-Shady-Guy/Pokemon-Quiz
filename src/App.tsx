import { useShallow } from "zustand/shallow";

import { QuizView } from "./QuizView";
import { useQuizStore } from "./store";

export default function App() {
    const statusStore = useQuizStore(useShallow(state => ({
        status: state.status,
        setStatus: state.setQuizStatus
    })));

    const startQuiz = () => {
        statusStore.setStatus("started");
    }

    return (
        <>
            {statusStore.status === "not-started" && <StartView startQuiz={startQuiz}></StartView>}
            {statusStore.status === "started" && <QuizView></QuizView>}
            {statusStore.status === "finished" && <EndView></EndView>}
        </>
    )
}

interface StartQuizProps {
    startQuiz: () => void;
}

function StartView({ startQuiz }: StartQuizProps) {
    return (
        <div>
            <p>
                Welcome to the Pokemon trivia page! 
			    If you're here, then that means that you want to put your
				Pokemon knowledge to the test. You will be asked 10 pokemon
				related questions ranging from pokedex entries to type machups.
				Try to complete the quiz as fast as possible.
            </p>
            <button type="button" onClick={startQuiz}>Start Quiz</button>
        </div>
    )
}

function EndView() {
    const store = useQuizStore(useShallow(state => ({
        score: state.score,
        questionInfo: state.questionInfo,
        reset: state.reset
    })));

    const incorrectAnswers = store.questionInfo.filter(info => info.userAnswer !== info.correctAnswer)
        .map(info => (
            <div>
                <p>{info.questionNumber} Your answer: {info.userAnswer} Correct answer: {info.correctAnswer}</p>
            </div>
        ))

    return (
        <>
            <p>Your final score is: {store.score} out of {store.questionInfo.length}.</p>
            {incorrectAnswers}
            <button type="button" onClick={store.reset}>Restart Quiz</button>
        </>
    )
}