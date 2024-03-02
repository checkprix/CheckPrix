import { useState } from "react";
import { PostDataApiJSON } from "../../apihooks/apihooks";
import { getValueBykey } from "../../common_method/commonMethods";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message,setMessage] = useState<string>("")
  const [showResetlink, setResetLink] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      setResetLink(true);
      setMessage("Please we are sending reset link")
    const response = await PostDataApiJSON(
      `${process.env.REACT_APP_FORGET_PASSWORD}`,
      { email: email }
    );
    if (getValueBykey("is_success", response)) {
      setResetLink(true);
      setMessage("Rest link has been sent to your exisitng email address \n check inbox or spam folder")
    }
  }
  catch(err)
  {
    setMessage("Internal server Error");
  }

    // Add your logic to handle the submission, like sending a reset password link to the provided email
    console.log("Submit email:", email);
    // Reset the form after submission
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send reset link
            </button>
          </div>
        </form>
        <div className={`text-center ${showResetlink ? "visible" : "hidden"}`}>
          {
            message
          }
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
