import { getAllTemps, getTempByCity } from '../middleware/apiAare';
import { useEffect, useState } from "react"
import './Aare.css'

export default function Aare() {

    const [temps, setTemps] = useState([]);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTemps = async () => {
            try {
                const data = await getAllTemps();
                const temps = Object.values(data); // extract the relevant data from the response and store it in an array
                setTemps(temps);
            } catch (error) {
                setError(error.message);
            }
        }
        loadTemps();
    }, [])
    
    return (
        <div className="Aare">
            <h1>Aare im Moment</h1>
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

            </>}
        </div>
    )
}