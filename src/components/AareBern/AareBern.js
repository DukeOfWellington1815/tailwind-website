import { getAllTemps, getTempByCity, getTempInBern } from '../../middleware/apiAare';
import { useEffect, useState } from "react"
import './AareBern.css'

export default function Aare() {

    const [temp, setTemp] = useState({});
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTemps = async () => {
            try {
                const data = await getTempInBern();
                console.log(data);
                setTemp(data);
            } catch (error) {
                setError(error.message);
            }
        }
        loadTemps();
    }, [])

    console.log(temp);

    var kanalbild = ""

    if (temp.bueber && temp.bueber.state === "open") {
        kanalbild = "../../assets/images/kanal-offen.svg"
    } else if (temp.bueber && temp.bueber.state === "closed") {
        kanalbild = "../../assets/images/kanal-zu.svg"
    }

    return !temp ? null : (
        <div className="Aare">
            <h1>Aare im Moment</h1>

            {temp.aare && temp.aare.location && (
                <div className='gameDiv grid gap-4 grid-cols-4 p-10'>
                    <h1 className='aare-stadt'>{temp.aare.location}</h1>
                    <article className='aare-box-temperatur container mx-auto bg-gray-200 rounded-xl shadow border p-8'>

                        <span className='aare-info-temperatur forecasttemp'>{temp.aare.temperature_text}</span>
                        <p className='aare-info temperatur'>{temp.aare.temperature}°</p>
                        <span className='aare-info-temperatur'>Z Wasser i ca. 2 Stung:</span>
                        <span className='aare-info-temperatur forecasttemp'>{temp.aare.forecast2h}°</span>

                    </article>

                    <article className='aare-box-wasser container mx-auto bg-gray-200 rounded-xl shadow border p-8'>
                        <div className='wasser-top'>
                            <span className='aare-info-wasser'>{temp.aare.flow} m3/s;</span>
                            <img className='kanalbild' src={kanalbild} alt={kanalstatus}/>
                        </div>
                        <p className='aare-info-wasser'>Wassermängi: {temp.aare.flow_text}</p>
                    </article>
                </div>
            )}

        </div>
    )
}
