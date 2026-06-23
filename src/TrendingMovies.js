import { doc, getDoc, setDoc, updateDoc, increment,
    collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import db from "./firebase.config"
import { NUM_TRENDING_MOVIES } from "./App.jsx"

const COLLECTION_NAME = "movieCollection";

export const updateSearchCount = async (id, title, poster_path) => {
    const movie_ref = doc(db, COLLECTION_NAME, id.toString());
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
        console.log(`${e} – Could not update search counts.`)
        return;
    }
}

export const getTrendingMovies = async () => {
    const collection_ref = collection(db, COLLECTION_NAME);
    const top_5_query = query(collection_ref, orderBy("search_count", "desc"), limit(NUM_TRENDING_MOVIES));
    let top_movies = null;
    try {
        top_movies = await getDocs(top_5_query);
    } catch(e) {
        console.log(`${e} – Could not fetch trending movies.`)
    } finally {
        return top_movies;
    }
}