import { getAllGames, getTempByCity } from '../../middleware/apiGames';
import { useEffect, useState } from "react"
import './GameLib.css'

export default function GameLib() {

    const [game, setGame] = useState([]);
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const loadGames = async () => {
    //         try {
    //             const data = await getAllGames();
    //             const games = Object.values(data); // extract the relevant data from the response and store it in an array
    //             setGame(games);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     }
    //     loadGames();
    // }, [])
    
    return (
        <div className="Aare">
            <h1>HALLO</h1>
            <article>
                                <h2>{game.name}</h2>
                                <p>{game.name}</p>
                            </article>
            {/* <h1>Aare im Moment</h1>
            {
                error ? <p className="error">{error}</p> : null
            }

            {
                loading ? <p className="loading">Loading...</p> : null
            }

            {
                temps.length === 0 ? <p className="error">No temps found</p> : null
            }

            {temps && <>
                {
                    temps.map((temp) => {
                        return (
                            <article key={temp.city}>
                                <h2>{temp.city}</h2>
                                <p>{temp.aare}</p>
                            </article>
                        )
                    })
                }

            </>} */}
        </div>
    )
}