import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@pages/Home";
import Notice from "@pages/Notice.tsx";
import FAQ from "@pages/FAQ.tsx";
import TermsOfService from "@pages/legal/TermsOfService";
import PrivacyPolicy from "@pages/legal/PrivacyPolicy";
import OptionalInfoConsent from "@pages/legal/OptionalInfoConsent";
import MarketingConsent from "@pages/legal/MarketingConsent";
import MarketingNotificationConsent from "@pages/legal/MarketingNotificationConsent";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/consent/optional" element={<OptionalInfoConsent />} />
                <Route path="/consent/marketing" element={<MarketingConsent />} />
                <Route path="/consent/notification" element={<MarketingNotificationConsent />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
