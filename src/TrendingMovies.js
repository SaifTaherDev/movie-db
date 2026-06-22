import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import db from "./firebase.config"

export const updateSearchCount = async (movie_id, title, poster_path) => {
    const movie_ref = doc(db, "movieCollection", movie_id);
    try {
        const snapshot = await getDoc(movie_ref);
        if (snapshot.exists()) {
            await updateDoc(movie_ref, {"search_count" : increment(1)})
        } else {
            await setDoc(movie_ref, {
                "title": title,
                "poster_path": poster_path,
                "search_count": 1
            })
        }
    } catch (e) {
        console.log(`${e}`)
        return;
    }
}