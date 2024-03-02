import { useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateDataAPI } from "../../apihooks/apihooks";
import { getValueBykey } from "../../common_method/commonMethods";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMessage, setMassage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const param = useParams();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic to handle the submission, like updating the password
    console.log(param);

    if (confirmPassword !== password || password.length < 8) {
      setMassage(true);
      setMessage(
        "Confirm password and new password should be equal and length should be more than 8 characters"
      );
      return;
    }

    try {
      // Reset the form after submission
      const response = await UpdateDataAPI(
        `${process.env.REACT_APP_FORGET_PASSWORD}`,
        {
          password: password,
          token: param.param,
        }
      );
      if (getValueBykey("is_success", response)) {
        setPassword("");
        setConfirmPassword("");
        setMassage(true);
        setMessage(
          "Password has been reset. Now you are redirecting to login page"
        );
        window.location.href = "/signin";
      }
    } catch (err) {
      setMessage("Internal server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="New password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Reset password
            </button>
          </div>
        </form>
        <div className={`text-center ${showMessage ? "visible" : "hidden"}`}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
