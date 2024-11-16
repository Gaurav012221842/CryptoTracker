import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();


  const handleSearch = async (term) => {
    if (!term) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${term}`);
      const data = await response.json();
      setSearchResults(data.coins || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const handleResultClick = (id) => {
    navigate(`/details/${id}`);
};
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term); // Trigger search on every input change
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 absolute left-3 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6-10.6 7.5 7.5 0 0 0 10.6 10.6z"
          />
        </svg>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {searchResults.map((coin) => (
            <div
              key={coin.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleResultClick(coin.id)}
            >
              <img src={coin.thumb} alt={coin.name} className="w-8 h-8 mr-3" />
              <span className="text-sm font-medium">{coin.name}</span>
              <span className="ml-auto text-xs text-gray-500">{coin.symbol.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
