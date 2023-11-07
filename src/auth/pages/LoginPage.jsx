import "./LoginPage.css";
import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../hooks";
import { useSelector } from "react-redux";
import { useState } from "react";
import Logo from "../../assets/logo2.jpg";
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};
const registerFormFields = {
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
  registerName: "",
};
export const LoginPage = () => {
  const [error, setError] = useState();
  const { startLogin, startRegister } = useAuthStore();
  const loginSubmit = (e) => {
    e.preventDefault();

    startLogin({ email: loginEmail, password: loginPassword });
  };
  const { status, errorMessage, errorRegisterMessage } = useSelector((state) => state.auth);
  const registerSubmit = (e) => {
    e.preventDefault();

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      password2: registerPassword2,
    });
    setError(null);
  };

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
    isFormValid,
    formState,
  } = useForm(registerFormFields);
  return (
    <div>
      <div className='container login-container'>
        <img src={Logo} className='logo' />
        <div className='row'>
          <div className='col-md-6 login-form-1'>
            <h3>Ingreso</h3>
            <form onSubmit={loginSubmit}>
              <div className='form-group mb-2'>
                <input
                  type='text'
                  name='loginEmail'
                  value={loginEmail}
                  onChange={onLoginInputChange}
                  className='form-control'
                  placeholder='Correo'
                />
              </div>
              <div className='form-group mb-2'>
                <input
                  type='password'
                  name='loginPassword'
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  className='form-control'
                  placeholder='Contraseña'
                />
              </div>
              <div className='form-group mb-2'>
                <input
                  type='submit'
                  disabled={status === "checking"}
                  className={status === "checking" ? "btnDisabled" : "btnSubmit"}
                  value='Ingresar'
                />
              </div>
              {(errorMessage && <span style={{ color: "red", position: "fixed" }}>{errorMessage}</span>) ||
                (error == "login" && (
                  <span style={{ color: "red", position: "fixed", fontWeight: "bold", fontSize: "20px" }}>
                    Datos Invalidos
                  </span>
                ))}
            </form>
          </div>

          <div className='col-md-6 login-form-2'>
            <h3>Registro</h3>
            <form onSubmit={registerSubmit}>
              <div className='form-group mb-2'>
                <input
                  type='text'
                  name='registerName'
                  value={registerName}
                  onChange={onRegisterInputChange}
                  className='form-control'
                  placeholder='Nombre'
                />
              </div>
              <div className='form-group mb-2'>
                <input
                  type='email'
                  name='registerEmail'
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                  className='form-control'
                  placeholder='Correo'
                />
              </div>
              <div className='form-group mb-2'>
                <input
                  type='password'
                  name='registerPassword'
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                  className='form-control'
                  placeholder='Contraseña'
                />
              </div>

              <div className='form-group mb-2'>
                <input
                  type='password'
                  name='registerPassword2'
                  value={registerPassword2}
                  onChange={onRegisterInputChange}
                  className='form-control'
                  placeholder='Repita la contraseña'
                />
              </div>

              <div className='form-group mb-2'>
                <input
                  disabled={status === "checking"}
                  className={status === "checking" ? "btnDisabled" : "btnSubmit"}
                  type='submit'
                  value='Crear cuenta'
                />
              </div>
              {(errorRegisterMessage && (
                <span style={{ color: "red", position: "fixed", fontWeight: "bold", fontSize: "20px" }}>
                  {errorRegisterMessage}
                </span>
              )) ||
                (error === "register" && (
                  <span style={{ color: "red", position: "fixed", fontWeight: "bold", fontSize: "20px" }}>
                    Datos Invalidos
                  </span>
                ))}
            </form>
          </div>
        </div>
        <h2 className='disclaimer'>Nota: Al primer uso de la web puede tardar 1 minuto en levantar el servidor.</h2>
      </div>
    </div>
  );
};
