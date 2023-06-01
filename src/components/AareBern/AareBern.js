import { getAllTemps, getTempByCity, getTempInBern } from '../../middleware/apiAare';
import { useEffect, useState } from "react"
import './AareBern.css'

import kanalOffen from '../../assets/images/kanal-offen.svg';
import kanalZu from '../../assets/images/kanal-zu.svg';

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

        // Set up an interval to refresh the data every 60 seconds
        const intervalId = setInterval(loadTemps, 60000 * 5);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [])

    console.log(temp);

    var kanalbild = ""
    var kanalstatus = ""

    if (temp.bueber && temp.bueber.state === "open") {
        kanalbild = kanalOffen;

    } else if (temp.bueber && temp.bueber.state === "closed") {
        kanalbild = kanalZu
        kanalstatus = "zu"

    }

    return !temp ? null : (
        <div className="Aare">
            {temp.aare && temp.aare.location && (
                <div className='gameDiv grid gap-4 grid-cols-4 p-10'>
                    <h1 className='aare-stadt'>{temp.aare.location}</h1>
                    <article className='aare-box-temperatur container mx-auto bg-gray-200 rounded-xl shadow border p-8'>
                       <p className='aare-info temperatur'>{temp.aare.temperature}°</p>

 
                        <span className='aare-info-temperatur forecasttemp'>Z Wasser i ca. 2 Stung:</span>
                        <span className='aare-info forecasttemp'>{temp.aare.forecast2h}°</span>
                        <span className='aare-info-temperatur forecasttemp'>Parole: {temp.aare.temperature_text}</span>
                    </article>

                    <article className='aare-box-temperatur container mx-auto bg-gray-200 rounded-xl shadow border p-8'>
                            <span className='aare-info temperatur'>{temp.aare.flow} m3/s</span>
                            <img className='kanalbild' src={kanalbild} alt={kanalstatus}/>
                        <p className='aare-info-temperatur forecasttemp'>Wassermängi: {temp.aare.flow_text}</p>
                    </article>
                </div>
            )}

        </div>
    )
}
