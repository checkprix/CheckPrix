import React, { useState } from "react";
import { UpdateDataAPIAdminJson } from "../apiMethods/apihooks";
import { getValueBykey } from "../common_method/commonMethods";

const ChangePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if(password !== confirmPassword)
    {
        setError("Password must be at least 8 characters long");
        return;
      }

    console.log(currentPassword,password)

    const response = await updatePassword(currentPassword, password, setError);

    if (response) {
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 flex flex-col justify-center items-center w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4 w-full">
        <label htmlFor="currentPassword" className="block text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          className="form-input mt-1 block w-full rounded-lg"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="password" className="block text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="password"
          className="form-input mt-1 block w-full rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="confirmPassword" className="block text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="form-input mt-1 block w-full rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePasswordForm;

const updatePassword = async (
  currentPassword: string,
  password: string,
  setError: Function
) => {
  try {
    const isChanged = await UpdateDataAPIAdminJson(
      `${process.env.REACT_APP_CHANGE_PASSWORD_ADMIN}`,
      {
        newpassword: password,
        password: currentPassword,
      }
    );
    if(isChanged === null){
      setError("Wrong Credentials");
      return false;
    }
    const message = getValueBykey('message',isChanged);
    if(!message) {setError(message); return false;}
    alert("Password Changed");
    return true;
  } catch (err) {
    setError("Internal server error");
    return false;
  }
};
