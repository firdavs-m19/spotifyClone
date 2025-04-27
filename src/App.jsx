import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { reducerCases } from "./utils/Constants";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider"; // Ensure correct import

function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      window.location.hash = ""; // Clear the hash to avoid repeated extraction
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [dispatch]); 

  return (
    <div>
      {token ? <Spotify /> : <Login />}
    </div>
  );
}

export default App;
