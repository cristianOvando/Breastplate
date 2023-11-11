import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from '../pages/LandingPage';
import navbarContexts from "../contexts/navbarContexts";
import TokenContext from "../contexts/TokenContext";
import showLoginContext from "../contexts/showLoginContext";

function App() {

  const [isNavbar, setIsNavbar] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
    <navbarContexts.Provider value={{isNavbar, setIsNavbar}}>
    <TokenContext.Provider value={{isToken, setIsToken}}>
    <showLoginContext.Provider value={{showLogin, setShowLogin}}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </showLoginContext.Provider>
    </TokenContext.Provider>
    </navbarContexts.Provider>
    </BrowserRouter>
  );
}

export default App;
