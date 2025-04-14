import { Routes, Route } from 'react-router-dom';
import CoinOverview from "./CoinOverview.jsx";
import Contact from "./Contact.jsx";
import CoinDetail from "./CoinDetail.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<CoinOverview />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
    );
}

export default App;
