import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@pages/Home";
import Notice from "@pages/Notice.tsx";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notice" element={<Notice />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
