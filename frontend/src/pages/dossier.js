import Header from "../layouts/Header"
import AareBern from "../components/AareBern/AareBern"
import GameLib from "../components/GameLib/GameLib"
import CV_EN from "../assets/docs/CV_EN.pdf"

export default function dossier() {
    return (
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <h1>WELCOME TO MY DOSSIER PAGE</h1>
        <embed src={CV_EN} width="800" height="1200" type="application/pdf"></embed>
      </div>
    );
  }