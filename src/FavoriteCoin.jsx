
function FavoriteCoin({ coin, onRemove }) {
    return (
        <div className="favorite-coin">
            <span>{coin.name}</span>
            <button onClick={() => onRemove(coin)}>Verwijder</button>
        </div>
    );
}

export default FavoriteCoin;
