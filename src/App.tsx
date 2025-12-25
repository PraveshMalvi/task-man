import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/completed" element={<Completed />} />
      </Routes>
    </>
  );
};

export default App;
