import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import LandingPage from '../pages/LandingPage';
import FormBreatplate from '../pages/FormPage';
import HomeBreastplate from '../pages/HomePage';
import navbarContexts from "../contexts/navbarContexts";
import TokenContext from "../contexts/TokenContext";
import showLoginContext from "../contexts/showLoginContext";
import GenderContext from "../contexts/genderContext";
import FrameworkContext from "../contexts/FrameworkContext";

function App() {
  const [isNavbar, setIsNavbar] = useState(false);
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [gender, setGender] = useState(null); 
  const [framework, setFramework] = useState(false);

  return (
    <BrowserRouter>
      <navbarContexts.Provider value={{ isNavbar, setIsNavbar }}>
        <TokenContext.Provider value={{ isToken: token, username, setIsToken: setToken, setUsername, setSex: setGender }}>
          <showLoginContext.Provider value={{ showLogin, setShowLogin }}>
            <GenderContext.Provider value={{ gender, setGender }}>
              <FrameworkContext.Provider value={{framework, setFramework}}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/FormBreastplate" element={<FormBreatplate />} />
                <Route path="/Home" element={<HomeBreastplate />} />
              </Routes>
              </FrameworkContext.Provider>
            </GenderContext.Provider>
          </showLoginContext.Provider>
        </TokenContext.Provider>
      </navbarContexts.Provider>
    </BrowserRouter>
  );
}

export default App;

