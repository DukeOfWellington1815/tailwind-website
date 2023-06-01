const URL = "https://aareguru.existenz.ch/v2018/"

export async function getAllTemps() {
    const response = await fetch(`${URL}/cities`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getTempByCity(city) {
    const response = await fetch(`${URL}/current?city=${city}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getTempInBern(city) {
    const response = await fetch(`${URL}/current?city=bern`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}