import logo from '../assets/images/logo512.png';
import './Header.css';
import "../assets/styles/corporateDesign.css";

export default function Header() {
  return (
    <nav className="bg-bright-color shadow border-0 p-4 flex sm:justify-center">
      <div className="flex justify-between items-center">
        <img src={logo} className="App-logo monkeylogo" alt="logo" />
        <div className="space-x-16">
          {[
            ["Home", "/dashboard"],
            ["Dossier", "/dossier"],
            ["Projects", "/projects"],
            ["Contact", "/contact"],
          ].map(([title, url]) => (
            <a href={url} class="font-display max-w-sm text-2xl font-bold leading-tight">
              <span class="link link-underline link-underline-black text-black">
                {title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
  
  
}