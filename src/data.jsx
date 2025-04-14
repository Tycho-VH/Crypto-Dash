import { useEffect, useState } from "react";

export function useCryptoData() {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://rest.coincap.io/v3/assets?apiKey=b5b408b7bda51e14b36104f74db3fa8920bd9aeb468531e48ba84a9f7d931e03")
            .then(response => response.json())
            .then(data => {
                setCryptoData(data.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { cryptoData, loading, error };
}
