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

