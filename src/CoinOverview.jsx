import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import SearchBar from "./SearchBar";
import FavoriteCoin from "./FavoriteCoin";

function CoinOverview() {
    const [coins, setCoins] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [favorite, setFavorite] = useState([]);

    // Voeg favorieten toe uit localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorite(JSON.parse(savedFavorites));
        }
    }, []);

    // Bewaar favorieten in localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorite));
    }, [favorite]);

    useEffect(() => {
        fetch("https://rest.coincap.io/v3/assets?apiKey=b5b408b7bda51e14b36104f74db3fa8920bd9aeb468531e48ba84a9f7d931e03")
            .then((res) => res.json())
            .then((data) => setCoins(data.data))
            .catch((error) => console.error("Fout bij ophalen van coins:", error));
    }, []);

    function toggleFavorite(coin) {
        const isAlreadyFavorite = favorite.some(fav => fav.id === coin.id);
        if (isAlreadyFavorite) {
            setFavorite(favorite.filter(fav => fav.id !== coin.id));
        } else {
            setFavorite([...favorite, coin]);
        }
    }

    function isFavorite(coin) {
        return favorite.some(fav => fav.id === coin.id);
    }

    return (
        <div className="container">
            <header>
                <h1>📊 Coin Overview</h1>
                <nav>
                    <Link to="/contact">Grafiek</Link>
                </nav>
            </header>

            <SearchBar keyword={keyword} onChange={(e) => setKeyword(e.target.value)} />

            <div>
                <h2>⭐ Favoriete Coins</h2>
                <div className="favorites">
                    {favorite.length === 0 ? (
                        <p>Je hebt nog geen favorieten.</p>
                    ) : (
                        favorite.map((coin) => (
                            <FavoriteCoin key={coin.id} coin={coin} onRemove={toggleFavorite} />
                        ))
                    )}
                </div>
            </div>

            <div className="coin-grid">
                {coins
                    .filter(
                        (coin) =>
                            coin.name.toLowerCase().includes(keyword.toLowerCase()) ||
                            coin.symbol.toLowerCase().includes(keyword.toLowerCase())
                    )
                    .map((coin) => (
                        <div key={coin.id} className="card">
                            <Link to={`/coin/${coin.id}`}>
                                <h2>{coin.name}</h2>
                                <div className="price">Prijs: ${parseFloat(coin.priceUsd).toFixed(2)}</div>
                                <p
                                    className={`change ${
                                        parseFloat(coin.changePercent24Hr) >= 0 ? "positive" : "negative"
                                    }`}
                                >
                                    {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                                </p>
                            </Link>
                            <button
                                className="favorite-button"
                                onClick={() => toggleFavorite(coin)}
                            >
                                {isFavorite(coin) ? "★" : "☆"}
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default CoinOverview;
