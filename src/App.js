import { useEffect } from "react";
import "./App.css";
import { useAutho } from "./contexts/AuthorizationContext";
import Routes from "./Routes/Routes";
import Footer from "./components/Footer/Footer"
import "./components/Footer/Footer.css"
import History from "./components/History/History"

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

        <div className="page-container">
            <div className="content-wrap">
            <Routes />
            {/* <History /> */}
            </div>
            
            
            <Footer />


        </div>
    );
}

export default App;
