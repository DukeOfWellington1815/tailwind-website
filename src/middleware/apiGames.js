const URL = "https://hp-api.onrender.com/api"

export async function getAllGames() {
    const response = await fetch(`${URL}/characters`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getGameById(id) {
    const response = await fetch(`${URL}/character/:${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function createGame(game, token) {
    const response = await fetch(`${URL}/api/posts`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(game)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function updateGame(game, token) {
    const response = await fetch(`${URL}/api/posts/${game.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(game)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deleteGame(id, token) {
    const response = await fetch(`${URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}