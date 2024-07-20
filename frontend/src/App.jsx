import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import ProvideCertificate from "./components/ProvideCertificate";
import ShowDatabase from "./components/ShowDatabase";
import ContentWritingForm from "./components/ContentWritingForm";
import VolunteeringForm from "./components/VolunteeringForm";
import SocialMediaMarketingForm from "./components/SocialMediaMarketingForm";
import ProductOnlineMarketingForm from "./components/ProductOnlineMarketingForm";
import SentCertificates from "./components/SentCertificates";
import ContentWritingFormStartPage from "./components/ContentWritingFormStartPage";
import VolunteeringFormStartPage from "./components/VolunteeringFormStartPage";
import SocialMediaMarketingFormStartPage from "./components/SocialMediaMarketingFormStartPage";
import ProductOnlineMarketingFormStartpage from "./components/ProductOnlineMarketingFormStartPage";
import AdminLayout from "./components/AdminLayout";
import axios from "axios";
import SendOfferLetter from "./components/SendOfferLetter";
import SendDonationReceipt from "./components/SendDonationReceipt";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminPanel />} />
          <Route path="provide-certificate" element={<ProvideCertificate />} />
          <Route path="sent-certificates" element={<SentCertificates />} />
          <Route path="send-donation-receipt" element={<SendDonationReceipt />} />
          <Route path="send-offer-letter" element={<SendOfferLetter/>}/> 
          <Route path="show-database" element={<ShowDatabase />} />
        </Route>
        <Route
          path="/content-writing"
          element={<ContentWritingFormStartPage />}
        />
        <Route
          path="/content-writing/register"
          element={<ContentWritingForm />}
        />
        <Route path="/volunteering" element={<VolunteeringFormStartPage />} />
        <Route path="/volunteering/register" element={<VolunteeringForm />} />
        <Route
          path="/social-media-marketing"
          element={<SocialMediaMarketingFormStartPage />}
        />
        <Route
          path="/social-media-marketing/register"
          element={<SocialMediaMarketingForm />}
        />
        <Route
          path="/product-online-marketing"
          element={<ProductOnlineMarketingFormStartpage />}
        />
        <Route
          path="/product-online-marketing/register"
          element={<ProductOnlineMarketingForm />}
        />
      </Routes>
    </Router>
  );
};

export default App;
