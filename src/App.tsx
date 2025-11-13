import Home from "@/views/Home";
import SiteHeader from "./components/global/SiteHeader";
import '@css/header.css';

const App = () => {
    return (
        <>
            <SiteHeader />
            <Home />
        </>
    )
}

export default App;
