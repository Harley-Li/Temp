import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/admin";
import Horizon from "./pages/Horizon/horizon";
import Welcome from "./pages/welcome/welcome";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Horizon />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/glass" element={<Welcome />} />
        </Routes>
    );
}

export default App;
