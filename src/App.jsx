import { useState } from "react";
import crypto from "crypto";

async function postData(user) {
  parseInputData();
  try {
    const response = await fetch("https://localhost3000/userData", {
      method: "POST",
      body: JSON.stringify(parseInputData())
    });

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status.toString());
    };
  } catch (e) {
    console.error("Error: " + e);
  };

  return { response, e }
};

function parseInputData() {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const hash = crypto.createHash("sha256");


  document.getElementById("username").value !== "" && 
  !document.getElementById("username").value.includes(" ") ?
  setUsername(true) :
  setUsername(false);

  document.getElementById("password").value !== "" && 
  !document.getElementById("password").value.includes(" ") ?
  setPassword(true) :
  setPassword(false);

  if (username && password) {
    const user = {
      user: username,
      pass: hash.update(password).digest(password)
    }

    return user;
  } else {
    alert("Please input username and password.");
  }
}

function App() {

  return (
    <>
      <header>
        <h1 className=
        "text-center text-5xl m-5">
          Log in
        </h1>
      </header>

      <main className=
      "flex justify-center m-10">

        <form method="POST" className=
        "flex flex-col justify-center align-center">

          <input type="text" id="username" placeholder="Username" className=
          "placeholder:text-center text-center border-2 m-5"
          />

          <input type="password" placeholder="Password" className=
          "placeholder:text-center text-center border-2 m-5"
          />

          <input type="submit" value="Submit" onClick={postData} className=
          "border-2 w-20"
          />

        </form>
    
      </main>

      <footer>
      </footer>
    </>
  )
}

export default App
