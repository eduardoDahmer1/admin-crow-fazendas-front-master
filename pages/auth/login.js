import React from "react";
import Router from 'next/router'
import cookie from 'js-cookie';
// layout for page
import Auth from "layouts/Auth.js";
export default function Login({isEmail, isPassword}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = () => {
    if ( email === isEmail && password === isPassword) {
      cookie.set('isAuth', true, { expires: 1});
      Router.push('/admin/dashboard');
    } else {
      alert("Por favor, verifique seu email ou senha!");
    }
  }

  React.useEffect(()=>{
    setEmail(document.querySelector(".inputEmail").value);
    setPassword(document.querySelector(".inputPassword").value);
  },[setEmail, setPassword])

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      type="email"
                      className="inputEmail border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                    onChange={(e) => setPassword(e.currentTarget.value)}
                      type="password"
                      className="inputPassword border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={signIn}
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;

export async function getServerSideProps(ctx) {

  let [isEmail, isPassword] = ["crowfazendas@gmail.com", "w[CdQX(uVmt{Jz$:~7Ft"];

  return { props: {isEmail, isPassword} };
}