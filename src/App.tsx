import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/admin";
import Welcome from "./pages/welcome/welcome";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}

export default App;
