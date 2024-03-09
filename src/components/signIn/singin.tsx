import { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { PostDataApiJSON } from "../../apihooks/apihooks";
import { useNavigate } from "react-router-dom";
import Notification from "../common/notification/notification";
import { Link } from "react-router-dom";
import Logo from "../../assests/logo/logo.png"
const SignIn = () => {
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  // providing option for notification
  const [message,setMessage] = useState<string>("");
  const [trigger,setTrigger] = useState<boolean>(false);
  const navigate = useNavigate();


  return (
    <>
      <Navbar />
     { trigger &&<Notification message={message} setTrigger={setTrigger} status={false} />}
      <div className="h-screen flex justify-between items-between">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={Logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {!toggle
                ? " Sign in to your account"
                : " Sign up to your account"}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {console.log(e.target.value); setEmail(e.target.value)}}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-5"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className={`text-sm ${!toggle ? "block" : "hidden"}`}>
                    <Link
                      to={'/forget-password'}
                      className="font-semibold text-orange-600 hover:text-orange-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    value={password}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-5"
                  />
                </div>
              </div>

              <div className={`text-sm ${toggle ? "block" : "hidden"}`}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="currentpassword"
                    name="currentpassword"
                    type="password"
                    autoComplete="current-password"
                    value={confirmPassword}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-5"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const res = await SumbmitForDetail(email, password, toggle);
                    console.log(res);
                    if (res?.is_success) {
                      SetLocalStorage();
                      navigate("/");
                    } else if(password !== confirmPassword && toggle)
                    {
                      setTrigger(false);
                      setMessage("Password does't match !!!");
                      setTrigger(!trigger)
                    }
                    else{
                      setTrigger(false);
                      setMessage("Wrong credentials !!!");
                      setTrigger(!trigger)
                    }
                  }}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  {!toggle ? "Sing in" : "Sign up"}
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                onClick={() => {
                  setToggle(!toggle);
                }}
                href="#"
                className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
              >
                {toggle ? " Sign in" : "Sign up"}
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;

const SumbmitForDetail = async (
  email: string,
  password: string,
  toggle: boolean
) => {
  try {
    const response = await PostDataApiJSON(
      !toggle
        ? process.env.REACT_APP_LOGIN_API_URL
        : process.env.REACT_APP_REGISTER_API_URL,
      {
        email: email,
        password: password,
      }
    );

    //naviagte
    console.log(response);
    if(!toggle && response?.is_success)
    {
      
    }
    return response;
  } catch (err) {
    alert("Problem");
  }
};

// const useSumbitForSignUp = async (
//   email: string,
//   password: string,
//   confirmPassword: string
// ) => {
//   try {
//     if (confirmPassword !== password) {
//       alert("Password does't match");
//       return;
//     }
//     const response = await usePostData(process.env.REACT_APP_REGISTER_API_URL, {
//       email: email,
//       password: password,
//     });

//     console.log(response);
//   } catch (err) {
//     alert("Problem");
//   }
// };

const SetLocalStorage = () => localStorage.setItem("checkprix", "true");
