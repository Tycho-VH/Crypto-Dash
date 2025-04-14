const SearchBar = ({ keyword, onChange }) => {
    return (
        <input
            type="text"
            className="border border-gray-300 px-5 py-2 w-full rounded-full bg-gray-100"
            placeholder="Zoek coins..."
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default SearchBar;
