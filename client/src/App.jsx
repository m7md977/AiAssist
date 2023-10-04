import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components";
import {
  Home,
  PrivacyPolicy,
  TermsOfService,
  WriteEmail,
  CorrectMyLanguage,
  ChatBot,
  ChatBot1,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />

          {/* Applications Pages */}
          <Route path="/correct-sentence" element={<CorrectMyLanguage />} />
          <Route path="/write-email" element={<WriteEmail />} />
          <Route path="/chat-bot" element={<ChatBot />} />
          <Route path="/chat-bot1" element={<ChatBot1 />} />

          {/* User Pages */}

          {/* Sub Pages */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Auth Pages */}
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
