import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CoinDetail() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        fetch(`https://rest.coincap.io/v3/assets/${id}?apiKey=b5b408b7bda51e14b36104f74db3fa8920bd9aeb468531e48ba84a9f7d931e03`)
            .then((res) => res.json())
            .then((data) => setCoin(data.data))
            .catch((error) => console.error("Fout bij ophalen van coin:", error));
    }, []);

    if (!coin) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>{coin.name} ({coin.symbol})</h1>
            <p>Prijs: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>Marktkapitalisatie: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
            <p>Verandering (24h): {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
            <p>Rank: {coin.rank}</p>
        </div>
    );
}

export default CoinDetail;
