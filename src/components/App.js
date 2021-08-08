import axios from "axios";
import { useEffect, useState } from "react";
import Routes from "../Routes/Routes";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    const toke = JSON.parse(localStorage.getItem("token"));
    setToken(toke);

    if (token !== "") {
      try {
        await axios.get("http://localhost:3001/member", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        localStorage.setItem("valid", JSON.stringify("valid"));
      } catch (e) {
        localStorage.setItem("valid", JSON.stringify("invalid"));
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [token, user]);
  return (
    <>
      <Routes user={user} setUser={setUser} />
    </>
  );
}

export default App;
