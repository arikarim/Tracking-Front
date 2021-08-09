import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Routes from "../Routes/Routes";
import { createUser } from "../Actions/user";

function App() {
  const [user, setUser] = useState([]);
  const toke = JSON.parse(localStorage.getItem("token"));
  const userr = JSON.parse(localStorage.getItem("correctuser"));
  const dispatch = useDispatch();

  const fetchData = async () => {
    if (toke !== "") {
      try {
        const data = await axios.get("http://localhost:3001/member", {
          headers: {
            "Content-Type": "application/json",
            Authorization: toke,
          },
        });
        console.log(data.data.user);
        localStorage.setItem("correctuser", JSON.stringify(data.data.user));
        dispatch(createUser(data.data.user));
        localStorage.setItem("valid", JSON.stringify("valid"));
      } catch (e) {
        localStorage.setItem("valid", JSON.stringify("invalid"));
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchData();
    console.log(userr);
    // eslint-disable-next-line
  }, [toke, userr]);
  return (
    <>
      <Routes user={user} setUser={setUser} />
    </>
  );
}

export default App;
