import Header from "../layouts/Header"
import AareBern from "../components/AareBern/AareBern"
import GameLib from "../components/GameLib/GameLib"

export default function projects() {
    return (
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <h1>WELCOME TO MY PROJECTS PAGE</h1>
        <AareBern/>
        <GameLib/>
      </div>
    );
  }