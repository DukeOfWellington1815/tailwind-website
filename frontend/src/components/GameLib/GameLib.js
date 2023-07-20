import { getAllGames, getGameById } from '../../middleware/apiGames';
import { useEffect, useState } from "react"
import './GameLib.css'
import GameForm from "../GameForm/GameForm"

export default function GameLib() {

    const [games, setGames] = useState([]);
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGames = async () => {
            try {
                const data = await getAllGames();
                const games = Object.values(data); // extract the relevant data from the response and store it in an array
                setGames(games);
            } catch (error) {
                setError(error.message);
            }
        }
        loadGames();
    }, [])

    return (
        <div className="Aare">
            <h1>HALLO</h1>

            <GameForm/>

            <h1>Harry Bodder</h1>
            {
                error ? <p className="error">{error}</p> : null
            }

            {
                loading ? <p className="loading">Loading...</p> : null
            }

            {
                games.length === 0 ? <p className="error">No characters found</p> : null
            }

            <div className='gameDiv grid gap-4 grid-cols-4 p-10'>
            {games && <>
                {
                    games.map((game) => {
                        return (
                            <article key={game.id} className='container mx-auto bg-gray-200 rounded-xl shadow border p-8'>
                                <h1>{game.name}</h1>
                                <p>{game.house}</p>
                                <img src={game.image} alt=""/>
                            </article>
                        )
                    })
                }

            </>}
            </div>
        </div>
    )
}