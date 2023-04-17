import { FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    const navigate = useNavigate();
    const estiloLabel = 'font-Urbanist text-xl text-left w-full m-3 font-bold';
    const estiloInput =
        'border-2 border-compPrimaryColor h-14 text-left w-full rounded-2xl p-3 font-Urbanist text-xl font-bold';
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const regexLength = 5;
        if (password.length < regexLength) {
            // alert("Ingrese datos validos");
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Ingrese datos validos',
                showConfirmButton: false,
                timer: 4000,
            });

            const regexPassword =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
            if (!password || !regexPassword.test(password)) {
                // alert("La contraseña debe contener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número.");
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'La contraseña debe contener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número.',
                    showConfirmButton: false,
                    timer: 4000,
                });
                return;
            }
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!correoElectronico || !regexEmail.test(correoElectronico)) {
                // alert("Por favor ingresa un correo electrónico válido.");
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Por favor ingresa un correo electronico valido',
                    showConfirmButton: false,
                    timer: 4000,
                });
                return;
            }
        } else {
            const datosUsuario = {
                correo: correoElectronico,
                password: password,
            };
            console.log(datosUsuario);
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosUsuario),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error == false) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: '¡Bienvenido!',
                            showConfirmButton: false,
                            timer: 4000,
                        });
                        if (data.token) {
                            localStorage.setItem('token', data.token); // aqui almaceno el token en local storage
                            navigate('/personalizacion');
                        }
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: 'Usuario no esta registrado',
                            showConfirmButton: false,
                            timer: 4000,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'error de servidor',
                        showConfirmButton: false,
                        timer: 4000,
                    });
                });
        }
    };

    return (
        <div className="bg-bgColor">
            <i onClick={() => navigate('/')}>
                {' '}
                <FaArrowLeft className="cursor-pointer text-3xl text-contrastPrimaryColor w-7 h-7 relative top-7 left-7" />{' '}
            </i>

            <section className="flex flex-col items-center">
                <img className="w-44 " src="/src/assets/logoBot.png" />
                <h1 className="font-signikaNegative text-5xl m-5">
                    Inicia Sesión{' '}
                </h1>

                <form
                    className="flex flex-col items-center bg-contrastSecundaryColor h-auto w-72 lg:w-80 rounded-2xl border-2 border-solid border-neutralColor p-4 mb-16 shadow-2xl"
                    onSubmit={handleSubmit}
                >
                    <div className="w-72 lg:w-80 rounded-t-2xl h-6 bg-secundaryColor -m-5 mb-1 border-t-2 border-neutralColor border-l-2 border-r-2"></div>
                    <label className={estiloLabel}>Correo Electrónico </label>
                    <input
                        className={estiloInput}
                        type="email"
                        value={correoElectronico}
                        onChange={(e) =>
                            setCorreoElectronico(e.target.value.trim())
                        }
                        name="correoElectronico"
                    ></input>
                    <label className={estiloLabel}>Contraseña</label>
                    <input
                        className={estiloInput}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                        name="contrasena"
                    ></input>
                    <button className="bg-compPrimaryColor border-2  rounded-2xl font-Urbanist mt-7 text-white text-xl p-3 w-52 font-bold ">
                        Iniciar Sesión
                    </button>

                    <div className="flex justify-between items-center mt-5">
                        <div className="h-1 w-32 bg-compPrimaryColor "></div>{' '}
                        <p className="m-2 text-xl text-compPrimaryColor">o</p>{' '}
                        <div className="h-1 w-32 bg-compPrimaryColor"></div>
                    </div>
                    <button className="w-64 bg-white p-4 border-2 border-black rounded-xl m-5 flex justify-center items-center font-Urbanist font-bold">
                        <FcGoogle className="mr-2 text-xl" />
                        Iniciar Sesión con Google
                    </button>
                    <p className="font-Urbanist ">
                        ¿No tienes una cuenta?{' '}
                        <a
                            className="font-bold hover:text-white"
                            href="./registro"
                        >
                            ¡Regístrate!
                        </a>{' '}
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Login;
