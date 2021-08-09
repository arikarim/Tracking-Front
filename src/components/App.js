import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Routes from "../Routes/Routes";
import { createUser } from "../Actions/user";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  const toke = JSON.parse(localStorage.getItem("token"));
  const userr = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const fetchUser = async () => {
    if (toke !== "") {
      try {
        const res = await axios.get("http://localhost:3001/users/index");
        const correct = res.data.filter((item) => item.id === userr.id);
        localStorage.setItem("correctuser", JSON.stringify(correct[0]));
        dispatch(createUser(correct[0]));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchData = async () => {
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
    fetchUser();
    // eslint-disable-next-line
  }, [token, user]);
  return (
    <>
      <Routes user={user} setUser={setUser} />
    </>
  );
}

export default App;
