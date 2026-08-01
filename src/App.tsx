import { useShallow } from "zustand/shallow";

import { QuizView } from "./QuizView";
import { useQuizStore } from "./store";

export default function App() {
    const quizStatus = useQuizStore(state => state.status);

    return (
        <>
            {quizStatus === "not-started" && <StartView />}
            {quizStatus === "started" && <QuizView />}
            {quizStatus === "finished" && <EndView />}
        </>
    );
}

function StartView() {
    const setQuizStatus = useQuizStore(state => state.setQuizStatus);
    const startQuiz = () => setQuizStatus("started");

    return (
        <section>
            <h1>Pokemon Quiz</h1>
            <p>
                Welcome to the Pokemon trivia Quiz! 
			    If you're here, then that means that you want to put your
				Pokemon knowledge to the test. You will be asked 10 pokemon
				related questions ranging from pokedex entries to type matchups.
				You only get 1 minute per question. 
                If you fail to answer before time runs out, you lose a point.
            </p>
            <button type="button" onClick={startQuiz}>Start Quiz</button>
        </section>
    );
}

function EndView() {
    const store = useQuizStore(useShallow(state => ({
        score: state.score,
        questionInfo: state.questionInfo,
        reset: state.reset
    })));

    const incorrectAnswers = store.questionInfo
        .filter(info => info.userAnswer !== info.correctAnswer)
        .map(info => (
            <div key={info.questionNumber}>
                <p>Question Number: {info.questionNumber}.</p>
                <p>{info.userAnswer === null ? "Time ran out" : `User answer: ${info.userAnswer}`}.</p>
                <p>Correct answer: {info.correctAnswer}.</p>
            </div>
        ));

    return (
        <section>
            <h1>Quiz Results</h1>
            <p>Your final score is {store.score}. Total questions in the quiz: {store.questionInfo.length}.</p>
            <div>
                {incorrectAnswers.length > 0 ? incorrectAnswers : <p>No incorrect answers! Good job.</p>}
            </div>
            <button type="button" onClick={store.reset}>Restart Quiz</button>
        </section>
    );
}