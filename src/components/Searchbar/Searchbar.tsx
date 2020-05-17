import React, { useState } from "react";

import "./Searchbar.scss";

interface SearchbarProps {
  onSearch: (query: string) => void;
}

function Searchbar({ onSearch }: SearchbarProps) {
  const [tempQuery, setTempQuery] = useState("");

  const onInputChange = (event: any) => {
    const val = event.target.value;
    setTempQuery(val);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onSearch && onSearch(tempQuery);
    }
  };

  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="submit-btn"
        onClick={() => onSearch && onSearch(tempQuery)}
      >
        Search
      </button>
    </div>
  );
}

export default React.memo(Searchbar);
