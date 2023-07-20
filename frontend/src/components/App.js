import logo from '../assets/images/logo512.png';
import './App.css';

export default function App() {
  return (
    <div className="container mx-aut rounded-xl shadow p-8 m-10 overflow-hidden">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="text-gray-500 text-lg">
        React and Tailwind CSS in action
      </p>


      
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
