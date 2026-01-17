import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import Home from "@pages/Home";
import Notice from "@pages/Notice.tsx";
import FAQ from "@pages/FAQ.tsx";
import TermsOfService from "@pages/legal/TermsOfService";
import PrivacyPolicy from "@pages/legal/PrivacyPolicy";
import OptionalInfoConsent from "@pages/legal/OptionalInfoConsent";
import MarketingConsent from "@pages/legal/MarketingConsent";
import MarketingNotificationConsent from "@pages/legal/MarketingNotificationConsent";
import KakaoLogin from "@pages/auth/KakaoLogin";
import KakaoCallback from "@pages/auth/KakaoCallback";
import Withdraw from "@pages/auth/Withdraw";
import CustomerService from "@pages/CustomerService";
import EventInquiry from "@pages/EventInquiry";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/consent/optional" element={<OptionalInfoConsent />} />
                <Route path="/consent/marketing" element={<MarketingConsent />} />
                <Route path="/consent/notification" element={<MarketingNotificationConsent />} />
                <Route path="/auth/kakao" element={<KakaoLogin />} />
                <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/customer-service" element={<CustomerService />} />
                <Route path="/event-inquiry" element={<EventInquiry />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
