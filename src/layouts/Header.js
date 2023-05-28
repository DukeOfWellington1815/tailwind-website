import logo from '../assets/images/logo512.png';
import './Header.css';
import "../assets/styles/corporateDesign.css";

export default function Header() {
    return (
        <nav className="bg-bright-color shadow border-0 p-4">

            {/* <a className="text-3xl text-gray-700 font-bold mb-5">
          Home
        </a>

        <a href='./pages/portfolio.js' className="text-3xl text-gray-700 font-bold mb-5">
          Portfolio
        </a>

        <a className="text-3xl text-gray-700 font-bold mb-5">
          Dossier
        </a>

        <a className="text-3xl text-gray-700 font-bold mb-5">
          Concact
        </a> */}


            <nav className="flex sm:justify-center space-x-4">
                {[
                    ['Home', '/dashboard'],
                    ['Dossier', '/team'],
                    ['Projects', '/projects'],
                    ['Contact', '/reports'],
                ].map(([title, url]) => (
                    <a href={url} class="font-display max-w-sm text-2xl font-bold leading-tight">
                    <span class="link link-underline link-underline-black text-black">{title}</span>
                </a>
                    ))}



            </nav>
            {/* <img src={logo} className="App-logo monkeylogo" alt="logo" /> */}



        </nav>
    );
}