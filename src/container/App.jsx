import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from '../pages/LandingPage';
import FormBreatplate from '../pages/FormPage';
import HomeBreastplate from '../pages/HomePage';
import navbarContexts from "../contexts/navbarContexts";
import TokenContext from "../contexts/TokenContext";
import showLoginContext from "../contexts/showLoginContext";

function App() {

  const [isNavbar, setIsNavbar] = useState(false);
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState(null);

  return (
    <BrowserRouter>
    <navbarContexts.Provider value={{isNavbar, setIsNavbar}}>
    <TokenContext.Provider value={{isToken: token, username, setIsToken: setToken, setUsername}}>
    <showLoginContext.Provider value={{showLogin, setShowLogin}}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/FormBreastplate" element={<FormBreatplate/>}/>
        <Route path="/Home" element={<HomeBreastplate/>}/>
      </Routes>
    </showLoginContext.Provider>
    </TokenContext.Provider>
    </navbarContexts.Provider>
    </BrowserRouter>
  );
}

export default App;
