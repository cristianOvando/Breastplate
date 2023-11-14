import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { activarContenedor, desactivarContenedor } from '../../animation/main.js';
import TokenContext from '../../contexts/TokenContext.js';
import showLoginContext from '../../contexts/showLoginContext.js';
import NavbarLogin from '../atoms/NavbarLogin.jsx';
import '../../assets/styles/FormBreastplate.css';

function FormBreastPlate() { 

  const [showLogin, setShowLogin] = useState(showLoginContext);
  const [framework, setFramework] = useState("male");
  const {isToken, setIsToken, setUsername} = useContext(TokenContext);
  const navigate = useNavigate();
  const form = useRef();

  const cambioRadioFramework = e => {
    setFramework(e.target.value);
  }

  const toggleForm = () => {
    if (showLogin) {
      activarContenedor();
    } else {
      desactivarContenedor();
    }
    setShowLogin(!showLogin);
  };

   const handlerClick = (e) =>{
      e.preventDefault()
      if (showLogin){
          const formData = new FormData(form.current);
          const usuario = formData.get("username");
          const contrasena = formData.get("password");

          const url = `http://localhost:2003/login/${usuario}/${contrasena}`;

          fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log("datos: ", data);
            setUsername(usuario);
            navigate("/Home");
          })
          .catch((error) => {
            console.error("Error", error);
          })

      }else{
        e.preventDefault()
        const forms = new FormData(form.current)

        let uri = "http://localhost:2003/users";
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${isToken}`
          
          },
          body: JSON.stringify({
            name: forms.get("name"),
            lastname: forms.get("lastname"),
            username: forms.get("username"),
            email: forms.get("email"),
            password: forms.get("password"),
            age: forms.get("age"),
            sex: forms.get("sex"),
            weight: forms.get("weight"),
            height: forms.get("height"),
          })
      }
      fetch(uri, options)
      .then(response => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        if (showLogin) {
          activarContenedor();
        } else {
          desactivarContenedor();
        }
        setShowLogin(!showLogin);
      })
      .catch((error) =>{
        console.error("Error", error);
      })
      }
    }
  

  return (
  <>
  <NavbarLogin/>
    <div className="container">
      <div className="box">
        <div className={`form ${showLogin ? 'sign_in' : 'sign_up'}`}>
          <h3>{showLogin ? 'Inicio de sesión' : 'Registro'}</h3>
          {showLogin ? (
            <span>¡Bienvenido a breastplate!</span>
          ) : (
            <span>¡Se parte de breastplate!</span>
          )}
          <form ref={form}>
            {showLogin ? (
              <>
              <div className='Login-container'>
                <div className="typeL">
                  <input type="username" placeholder="Nombre de usuario" name="username" id="email" />
                </div>
                <div className="typeL">
                  <input type="password" placeholder="Contraseña" name="password" id="password" />
                </div>
                <div className="forgot">
                  <span>¿Olvidaste tu contraseña?</span>
                </div>
              </div>
              </>
            ) : (
              <>
              <div className='Register-container'>
                <div className="type">
                  <input type="text" name="name" placeholder="Nombre" id="name" />
                </div>
                <div className="type">
                <input type="text" name="lastname" placeholder="Apellido" id="lasname" />
                </div>
                <div className="type">
                <input type="number" name="weight" placeholder="Peso" id="name" />
                </div>
                <div className="type">
                <input type="number" name="age" placeholder="Edad" id="name" />  
                </div>
                <div className="type">
                <input type="number" name="height" placeholder="Estatura" id="name" />
                </div>
                <div className="type">
                <input type="text" name="username" placeholder="Nombre de usuario" id="name" />
                </div>
                <div className="type">
                  <input type="email" name="email" placeholder="Correo" id="email" />
                </div>
                <div className="type">
                  <input type="password" name="password" placeholder="Contraseña" id="password" />
                </div>
                <div className='option'>
                  <div>
                    <label htmlFor="">Hombre</label>
                    <input type="radio" name='sex' value="male" id='radio1' checked={framework == "male" ? true : false} onChange={cambioRadioFramework}/>
                  </div>
                    <div>
                    <label htmlFor="">Mujer</label>
                    <input type="radio" name="sex" value="female" id="radio2" checked={framework == "female" ? true : false} onChange={cambioRadioFramework}/>
                    </div>
                  </div>
              </div>
              </>
            )}

            <button className="btn bkg" type="submit" onClick={handlerClick}>
              {showLogin ? 'Iniciar sesión' : 'Registrarme'}
            </button>
          </form>
        </div>
      </div>

      <div className="overlay">
        <div className={`page ${showLogin ? 'page_signIn' : 'page_signUp'}`}>
          {showLogin ? (
            <h3>¡Bienvenido de nuevo!</h3>
          ) : (
            <h3>¡Listo para ser parte de breastplate!</h3>
          )}
          {showLogin ? (
            <p>Ingresa tus datos para poder iniciar sesión en breastplate</p>
          ) : (
            <p>Ingresa tus datos para ser parte de breastplate</p>
          )}

          <button className="btn" onClick={toggleForm}>
            {showLogin ? 'Registrarme' : 'Iniciar sesión'}
            {showLogin ? (
              <i className="bi bi-arrow-right"></i>
            ) : (
              <i className="bi bi-arrow-left"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  </>
  );
}

export default FormBreastPlate;
