import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import KakaoCallback from "./pages/KakaoCallback.tsx";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/kakao/callback" element={<KakaoCallback />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
