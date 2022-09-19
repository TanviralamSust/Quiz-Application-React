import {useEffect, useState} from "react";
import {get, getDatabase, orderByKey, query, ref} from "firebase/database";

export default function useQuestions(videoID) {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchQuestions() {
            const db = getDatabase();
            const quizRef = ref(db, "quiz/"+videoID+"/questions");
            const quizQuery = query(
                quizRef,
                orderByKey()
            );
            try {
                setLoading(true);
                setError(false);
                const snapshot = await get(quizQuery);
                setLoading(false);

                if(snapshot.exists()) {
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())]
                    })
                }

            } catch (err) {
                setLoading(false);
                setError(true);
            }
        }
        fetchQuestions();

    },[videoID])
  return {
        loading,
        error,
        questions,
  }
}