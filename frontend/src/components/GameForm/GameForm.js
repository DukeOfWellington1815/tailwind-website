import { createGame, updateGame } from "../../middleware/apiGames"
import { useEffect, useState } from "react"
import styles from "./GameForm.module.css"

const defaultModel = {
    _id: "",
    borrower: {
        borrower_id: "",
        name: "",
        email: "",
        phone_number: ""
    },
    games: [
        {
            game_id: "",
            title: "",
            platform: "",
            genre: "",
            start_date: "",
            due_date: ""
        }
    ]
}

function validateModel(game) {
    const errors = {
        _id: "",
        borrower: {
            borrower_id: "",
            name: "",
            email: "",
            phone_number: ""
        },
        games: [
            {
                game_id: "",
                title: "",
                platform: "",
                genre: "",
                start_date: "",
                due_date: ""
            }
        ]
    }
    let isValid = true

    // Add validation logic here

    return { errors, isValid }
}

export default function GameForm({ session, gameToEdit }) {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)
    const [game, setGame] = useState(defaultModel)


    useEffect(() => {
        if (gameToEdit) {
            setGame(gameToEdit)
        } else {
            setGame(defaultModel)
        }
    }, [gameToEdit])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name.includes(".")) {
            const [parentName, childName] = name.split(".")
            setGame((prevGame) => ({
                ...prevGame,
                [parentName]: {
                    ...prevGame[parentName],
                    [childName]: value
                }
            }))
        } else if (name.includes("[")) {
            const [parentName, index, childName] = name.match(/\w+/g)
            setGame((prevGame) => ({
                ...prevGame,
                [parentName]: prevGame[parentName].map((item, i) =>
                    i === Number(index) ? { ...item, [childName]: value } : item
                )
            }))
        } else {
            setGame((prevGame) => ({
                ...prevGame,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(game)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        if (game.id) {
            try {
                await updateGame(game, session.token)
                alert("Game updated!")
            } catch (e) {
                alert("Could not update game")
            }
        } else {
            try {
                const newGame = await createGame(game, session.token)
                alert("Game created!")
            } catch (e) {
                alert("Could not create game")
            }
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col items-center bg-primary-color">

            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <h3 className="text-lg font-medium">Borrower Information</h3>
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="borrower-id">
                            Borrower ID
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="borrower-id"
                            name="borrower.borrower_id"
                            onChange={handleChange}
                            value={game.borrower.borrower_id}
                        />
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor="borrower-name">
                            Borrower Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="borrower-name"
                            name="borrower.name"
                            onChange={handleChange}
                            value={game.borrower.name}
                        />
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor="borrower-email">
                            Borrower Email
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="borrower-email"
                            name="borrower.email"
                            onChange={handleChange}
                            value={game.borrower.email}
                        />
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor="borrower-phone-number">
                            Borrower Phone Number
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="borrower-phone-number"
                            name="borrower.phone_number"
                            onChange={handleChange}
                            value={game.borrower.phone_number}
                        />
                    </div>


                    <div className="w-full md:w-1/2 px-3">
                        {game.games.map((gameItem, index) => (
                            <div key={index} className="">
                                <h3 className="text-lg font-medium mt-4">Game {index + 1}</h3>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor={`game-id-${index}`}>
                                    Game ID
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id={`game-id-${index}`}
                                    name={`games[${index}].game_id`}
                                    onChange={handleChange}
                                    value={gameItem.game_id}
                                />
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor={`game-title-${index}`}>
                                    Game Title
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id={`game-title-${index}`}
                                    name={`games[${index}].title`}
                                    onChange={handleChange}
                                    value={gameItem.title}
                                />
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor={`game-platform-${index}`}>
                                    Game Platform
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id={`game-platform-${index}`}
                                    name={`games[${index}].platform`}
                                    onChange={handleChange}
                                    value={gameItem.platform}
                                />
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor={`game-genre-${index}`}>
                                    Game Genre
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id={`game-genre-${index}`}
                                    name={`games[${index}].genre`}
                                    onChange={handleChange}
                                    value={gameItem.genre}
                                />
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor={`start-date-${index}`}>
                                    Start Date
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id={`start-date-${index}`}
                                    name={`games[${index}].start_date`}
                                    onChange={handleChange}
                                    value={gameItem.start_date}
                                />
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor={`due-date-${index}`}>
                                    Due Date
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id={`due-date-${index}`}
                                    name={`games[${index}].due_date`}
                                    onChange={handleChange}
                                    value={gameItem.due_date}
                                />

                            </div>
                        ))}
                    </div>

                </div>
            </form>
        </div>

    )
}