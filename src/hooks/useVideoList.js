import {useEffect, useState} from "react";
import {get, getDatabase, limitToFirst, orderByKey, query, ref, startAt} from "firebase/database";


export default function useVideoList(page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasmore, setHasmore] = useState(true)

    useEffect(() => {

        async function fetchVideos() {
            const db = getDatabase();
            const videoRef = ref(db, "videos");
            const videoQuery = query(
                videoRef,
                orderByKey(),
                startAt(""+page),
                limitToFirst(8),
            )
            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(videoQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())]
                    });
                } else {
                    setHasmore(false)
                }
            } catch (err){
                setLoading(false);
                setError(true);
            }
        }

        fetchVideos();
    },[page]);

    return{
        loading,
        error,
        videos,
        hasmore
    }
}