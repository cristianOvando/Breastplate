import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { activarContenedor, desactivarContenedor } from '../../animation/main.js';
import AlertBox from '../atoms/Alert.jsx';
import TokenContext from '../../contexts/TokenContext.js';
import showLoginContext from '../../contexts/showLoginContext.js';
import NavbarHome from '../atoms/NavbarHome.jsx';
import FrameworkContext from '../../contexts/FrameworkContext.js';
import UserContext from '../../contexts/UserContext.js';
import '../../assets/styles/FormBreastplate.css';

function FormBreastPlate() {
  const [showLogin, setShowLogin] = useState(showLoginContext);
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);
  const { framework, setFramework } = useContext(FrameworkContext);
  const {token, setToken} = useContext(TokenContext);
  const {isUser, setUser} = useContext(UserContext);


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

  const handlerClick = async (e) => {
    e.preventDefault();
    setErrorAlert(null);
    setSuccessAlert(null);

    if (showLogin) {
      try {
        const formData = new FormData(form.current);
        const usuario = formData.get("username");
        const contrasena = formData.get("password");

        const url = `http://34.232.224.98:2003/login/${usuario}/${contrasena}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (response.ok) {
          setSuccessAlert('¡Inicio de sesión exitoso!');
          setUser(true);
          console.log(data.message);
          setFramework(data.data);
          navigate("/Home");
        } else {
          setErrorAlert('¡Usuario o contraseña incorrectos!');
          console.error("Error en la respuesta del servidor: ", data);
        }
      } catch (error) {
        setErrorAlert('Error al iniciar sesión');
        console.error("Error al enviar la solicitud: ", error);
      }
    } else {
      try {
        const forms = new FormData(form.current);

        let uri = "http://34.232.224.98:2003/users";
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
        };

        const response = await fetch(uri, options);
        const data = await response.json();

        if (response.ok) {
          setSuccessAlert('Registro exitoso. ¡Bienvenido a breastplate!');
          if (showLogin) {
            activarContenedor();
          } else {
            desactivarContenedor();
          }
          setShowLogin(!showLogin);
        } else {
          setErrorAlert('¡Verifica tus datos e inténtalo de nuevo!');
        }
      } catch (error) {
        setErrorAlert('¡Verifica tus datos e inténtalo de nuevo!');
        console.error("Error", error);
      }
    }
  };

  return (
    <>
      <NavbarHome />
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
            <h3>¿No tienes cuenta?</h3>
          ) : (
            <h3>¡Listo para ser parte de breastplate!</h3>
          )}
          {showLogin ? (
            <p>Ingresa tus datos para poder iniciar sesión en breastplate</p>
          ) : (
            <p>Inicia sesión para poder ingresar a breastplate</p>
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
      {errorAlert && <AlertBox type="error" message={errorAlert} onClose={() => setErrorAlert(null)} />}
      {successAlert && <AlertBox type="success" message={successAlert} onClose={() => setSuccessAlert(null)} />}
    </>
  );
}

export default FormBreastPlate;
