import { useEffect } from "react";
import "./App.css";
import { useAutho } from "./contexts/AuthorizationContext";
import Routes from "./Routes/Routes";

function App() {
    const {
        logged,
        // setLogged,
        // setLoading,
        changeLoggedUser,
    } = useAutho();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            changeLoggedUser(user);
            console.log(user);
        } else {
            changeLoggedUser({ ...logged, isLogged: false });
            console.log(user);
        }
    }, []);

    return (
        <div>
            <Routes />
        </div>
    );
}

export default App;
