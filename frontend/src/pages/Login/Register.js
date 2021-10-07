import React, { useState } from "react";


import Axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [link_donation, setLinkDonation] = useState("");

  const register = () => {
    console.log(username);
    Axios.post("http://localhost:3001/user/register", {
      username: username,
      password: password,
      email: email,
      link_donation: link_donation,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="Register">
      <h1>Registration</h1>
      <div className="RegisterForm">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="Email"
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="link"
          placeholder="Link Donation..."
          onChange={(event) => {
            setLinkDonation(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Register;
