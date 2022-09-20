import Summary from "../Summary"
import Analysis from "../Analysis"
import useAnswers from "../../hooks/useAnswers";
import {useParams, useLocation} from "react-router-dom";
import _ from "lodash"

export default function Result() {
    const {id} = useParams();

    const {state} = useLocation();
    const {qna} = state;

    const {loading, error, answers} = useAnswers(id);


    function calculate() {
        let score = 0;

        console.log(answers);
        answers.forEach((question, index1) => {
            let correctIndexes = [], checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (qna[index1].options[index2].checked){
                    checkedIndexes.push(index2);
                    option.checked= true;
                }
            })
            if(_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + 5;
            }
        })
        return score;
    }

    const userScore = calculate();

    return(
        <>
            {loading && <div> ... Loading</div>}
            {error && <div>There was a Error!</div>}
            {
                answers && answers.length>0 && (
                    <>
                        <Summary score={userScore} noq={answers.length}/>
                        <Analysis answers={answers}/>
                    </>
                )
            }

        </>
    )
}