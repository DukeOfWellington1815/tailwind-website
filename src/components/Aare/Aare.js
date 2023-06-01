import { getAllTemps, getTempByCity } from '../../middleware/apiAare';
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
                console.log(temps);
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

            <div className='gameDiv grid gap-4 grid-cols-4 p-10'>
            {temps && <>
                {
                    temps.map((temp) => {
                        return (
                            <article key={temp.city} className='container mx-auto bg-gray-200 rounded-xl shadow border p-8'>
                                <h1>{temp.name}</h1>
                                <p>{temp.aare}&deg;</p>
                                {/* <p>{temp.temperature_text}</p>
                                <p>{temp.timestring}</p> */}
                            </article>
                        )
                    })
                }

            </>}
            </div>
        </div>
    )
}