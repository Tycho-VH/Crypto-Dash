import { useEffect, useRef } from "react";
import { useCryptoData } from "./data";
import { AgCharts } from "ag-charts-enterprise";

let chartInstance = null;

function Contact() {
    const chartRef = useRef(null);
    const { cryptoData, loading, error } = useCryptoData();

    useEffect(() => {
        if (!loading && !error && cryptoData.length > 0 && chartRef.current) {
            const top10Coins = [...cryptoData]
                .sort((a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd))
                .slice(0, 10);

            const chartData = top10Coins.map(coin => ({
                name: coin.name,
                marketCap: parseFloat(coin.marketCapUsd),
            }));

            const chartOptions = {
                container: chartRef.current,
                title: {
                    text: "Top 10 Crypto Market - Bar Chart",
                },
                series: [
                    {
                        type: "bar",
                        xKey: "name",
                        yKey: "marketCap",
                        data: chartData,
                    },
                ],
                tooltip: {
                    enabled: true,
                    renderer: ({ datum }) => {
                        const coinName = datum.name;
                        const marketCap = datum.marketCap;
                        return {
                            title: coinName || "Onbekend",
                            content: `Market Cap: $${Number(marketCap).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                            })}`,
                        };
                    },
                },
            };

            if (chartInstance) {
                chartInstance.update(chartOptions);
            } else {
                chartInstance = AgCharts.create(chartOptions);
            }
        }
    }, [cryptoData, loading, error]);

    if (loading) return <CenteredMessage text="Loading chart..." />;
    if (error) return <CenteredMessage text="Fout bij het ophalen van data." />;

    return (
        <div style={styles.wrapper}>
            <div style={styles.content}>
                <h1 style={styles.title}>Top 10 Crypto Market Bar Chart</h1>
                <div ref={chartRef} style={styles.chartContainer} />
            </div>
        </div>
    );
}

function CenteredMessage({ text }) {
    return (
        <div style={styles.wrapper}>
            <h2 style={{ textAlign: "center" }}>{text}</h2>
        </div>
    );
}

const styles = {
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box",
    },
    content: {
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
    },
    chartContainer: {
        width: "700px",
        height: "500px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        padding: "20px",
    },
};

export default Contact;
