import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from '../pages/LandingPage';
import FormBreastplate from '../pages/FormPage';
import HomeBreastplate from '../pages/HomePage';
import navbarContexts from "../contexts/navbarContexts";
import TokenContext from "../contexts/TokenContext";
import showLoginContext from "../contexts/showLoginContext";
import GenderContext from "../contexts/genderContext";
import FrameworkContext from "../contexts/FrameworkContext";
import UserContext from "../contexts/UserContext";
import ProtectedParentRoute from "./ProtectedParentRoute";

function App() {
  const [isNavbar, setIsNavbar] = useState(false);
  const [token, setToken] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [gender, setGender] = useState(null); 
  const [framework, setFramework] = useState(false);
  const [isUser, setUser] = useState(false);


  return (
    <BrowserRouter>
      <navbarContexts.Provider value={{ isNavbar, setIsNavbar }}>
        <TokenContext.Provider value={{ token, setToken }}>
          <showLoginContext.Provider value={{ showLogin, setShowLogin }}>
            <GenderContext.Provider value={{ gender, setGender }}>
              <FrameworkContext.Provider value={{framework, setFramework}}>
                <UserContext.Provider value={{isUser, setUser}}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Login" element={<FormBreastplate />} />
                    <Route element={<ProtectedParentRoute isUser={isUser}/>}>
                    <Route path="/Home" element={<HomeBreastplate />} />
                    </Route>
                  </Routes> 
                </UserContext.Provider>
              </FrameworkContext.Provider>
            </GenderContext.Provider>
          </showLoginContext.Provider>
        </TokenContext.Provider>
      </navbarContexts.Provider>
    </BrowserRouter>
  );
}

export default App;

