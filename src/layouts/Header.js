import logo from '../assets/images/logo512.png';
import './Header.css';
import "../assets/styles/corporateDesign.css";

export default function Header() {
  return (
    <nav className="bg-bright-color shadow border-0 p-4 flex sm:justify-center">
      <div className="w-full h-full flex justify-center items-center relative">
        <img src={logo} className="App-logo monkeylogo  absolute left-0 top-1/2 -translate-y-1/2" alt="logo" />
        <div className="space-x-16">
          {[
            ["Home", "/dashboard"],
            ["Dossier", "/dossier"],
            ["Projects", "/projects"],
            ["Contact", "/contact"],
          ].map(([title, url], index) => (
            <a key={index} href={url} className="font-display max-w-sm text-2xl font-bold leading-tight">
              <span className="link link-underline link-underline-black text-black">
                {title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );


}