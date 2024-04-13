import React, {useRef, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Common/Navbar";
import JobProtal from "./Pages/JobProtal";
import ScrollToTop from "./Common/ScrollToTop";
import JobDescriptionPage from "./Pages/JobDescriptionPage";

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobProtal />} />
        <Route path="/jobs/:id" element={<JobDescriptionPage />} />
      </Routes>
    </>
  );
};

export default App;
