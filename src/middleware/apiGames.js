const URL = "https://hp-api.onrender.com/api/characters"

export async function getAllGames() {
    const response = await fetch(`${URL}/cities`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getGameById(city) {
    const response = await fetch(`${URL}?city=${city}/current`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}