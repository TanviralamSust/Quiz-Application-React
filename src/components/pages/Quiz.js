import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import Answers from "../Answers";
import {useEffect, useReducer, useState} from "react";
import useQuestions from "../../hooks/useQuestions";
import {useParams, useNavigate} from "react-router-dom";
import _ from "lodash";
import {useAuth} from "../../contexts/AuthContext";
import {getDatabase, ref, set} from "firebase/database";

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case "questions" :
            action.value.forEach((question)=> {
                question.options.forEach((option) => {
                    option.checked=false;
                })
            })
            return action.value;
        case "answers":
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked= action.value;

            return questions;
        default:
            return state;
    }
}

export default function Quiz() {
    const {id} = useParams();
    const {loading, error, questions} = useQuestions(id)
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [qna, dispatch] = useReducer(reducer, initialState);
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type:"questions",
            value: questions,
        })
    },[questions])

    function handleAnswerChange (e, index) {
        dispatch({
            type:"answers",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,

        })
    }
    function nextQuestion() {
        if(currentQuestion + 1 <questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent+1);
        }
    }
    function prevQuestion() {
        if (currentQuestion >=1 && currentQuestion <= questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent-1);
        }
    }

    async function submit() {
        const {uid} = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna
        });

        navigate(`/result/${id}`,{state: {qna}})

    }

    const percentage = questions.length > 0 ? ((currentQuestion+1) /questions.length)*100 : 0;

    return(
        <>  {loading && <div>... Loading</div>}
            {error && <div>Error found!</div>}
            {!loading && !error && qna && qna.length>0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>

                    <Answers
                        options={qna[currentQuestion].options}
                        handleChange={handleAnswerChange}
                    ></Answers>
                    <ProgressBar
                        next={nextQuestion}
                        prev={prevQuestion}
                        submit={submit}
                        progress={percentage}
                    ></ProgressBar>
                    <MiniPlayer>
                    </MiniPlayer>
                </>
            )}

        </>
    )
}