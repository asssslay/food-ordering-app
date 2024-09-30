import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

export default Navigation;
