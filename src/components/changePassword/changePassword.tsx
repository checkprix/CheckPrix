import { useState } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Cover from "../../assests/images/cover.jpg";
import Notification from "../common/notification/notification";
import { UpdateDataAPI } from "../../apihooks/apihooks";
import { getValueBykey } from "../../common_method/commonMethods";
const ChangePassword = () => {
  const [message, setMessage] = useState<string>("");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [currentpassword, setCurrentpassword] = useState("");
  const [newPassword, setNewPasswword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusForNotification, setStatusForNotification] =
    useState<boolean>(false);
  return (
    <>
      <Navbar />
      {trigger && (
        <Notification
          message={message}
          setTrigger={setTrigger}
          status={statusForNotification}
        />
      )}
      <div
        style={{
          backgroundImage: `url(${Cover})`,
        }}
        className="h-screen flex justify-between items-between  bg-blend-overlay bg-gray-200 object-cover bg-no-repeat bg-cover "
      >
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://checkprix.net/images/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Change Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Current Password
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    onChange={(e) => setCurrentpassword(e.target.value)}
                    id="currentpassword"
                    name="currentpassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={currentpassword}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-5
                    focus:outline-none bg-transparent
                    "
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="newpassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Passoword
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    onChange={(e) => setNewPasswword(e.target.value)}
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    autoComplete="password"
                    required
                    value={newPassword}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-5
                    focus:outline-none bg-transparent
                    "
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="newpassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Passoword
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="password"
                    required
                    value={confirmPassword}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-5
                    focus:outline-none bg-transparent
                    "
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    checkPassword(
                      setTrigger,
                      setMessage,
                      newPassword,
                      confirmPassword,
                      currentpassword,
                      setStatusForNotification,
                      setNewPasswword,
                      setConfirmPassword,
                      setCurrentpassword
                    );
                  }}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;

const checkPassword = async (
  setTrigger: Function,
  setMessage: Function,
  newPassword: string,
  confirmPassword: string,
  currentpassword: string,
  setStatusForNotification: Function,
  setNewPasswword:Function,
  setConfirmPassword:Function,
  setCurrentpassword:Function
) => {
  setTrigger(false);
  if (newPassword !== confirmPassword) {
    // setTrigger(false);
    setMessage("New and confirm password does't match !!");
    setStatusForNotification(false);
    setTrigger(true);
    return;
  }

  if (newPassword.length < 8) {
    setMessage("Password should be more tham 8 characters");
    setStatusForNotification(false);
    setTrigger(true);
    return;
  }

  const res = await UpdateDataAPI(
    process.env.REACT_APP_CHANGE_PASSWORD_USER,
    { newpassword: newPassword, password: currentpassword }
  );
  console.log(res);
  const is_success = getValueBykey("is_success", res);
  if (is_success) {
    
    setStatusForNotification(true);
    setMessage("Password changed !!!");
    setTrigger(true);
    setConfirmPassword("");
    setNewPasswword("");
    setCurrentpassword("");
    return;
  } else {
    setStatusForNotification(false);
    setMessage("Something is wrong !!!");
    setTrigger(true);
    return;
  }
};
