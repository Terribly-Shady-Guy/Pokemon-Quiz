import { create } from "zustand";

export interface QuizQuestionDetail {
    questionNumber: number
    userAnswer: string | null
    correctAnswer: string
}

type QuizStatus = "not-started" | "started" | "finished";

interface QuizStore {
    score: number
    questionInfo: QuizQuestionDetail[]
    status: QuizStatus
    setQuizStatus: (newStatus: QuizStatus) => void
    insertQuestionInfo: (newDetail: QuizQuestionDetail) => void
    reset: () => void
}

export const useQuizStore = create<QuizStore>((set, _, store) => ({
    score: 0,
    questionInfo: [],
    status: "not-started",

    setQuizStatus: newStatus => {
        set(() => ({ status: newStatus }));
    },

    insertQuestionInfo: newDetail => {
        set(state => modifyQuizState(state, newDetail));
    },

    reset: () => {
        set(store.getInitialState());
    }
}));

function modifyQuizState(state: QuizStore, newDetail: QuizQuestionDetail) {
    const newState = {
        questionInfo: [...state.questionInfo, newDetail],
        score: state.score
    };

    if (newDetail.userAnswer === null) {
        newState.score--;
    } else if (newDetail.userAnswer === newDetail.correctAnswer) {
        newState.score++;
    }

    return newState;
}