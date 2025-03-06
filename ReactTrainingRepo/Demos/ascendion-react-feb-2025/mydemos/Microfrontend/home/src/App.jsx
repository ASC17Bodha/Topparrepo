import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import Header from "./header";
import Footer from "./footer";

const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <Header />
    <div className="my-10">
      Welcome to Workshops App
    </div>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") );;
root.render(<App />);