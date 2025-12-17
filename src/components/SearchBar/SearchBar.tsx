import { useState } from "react";
import "./SearchBar.css";
import { SEARCH } from "../../utils/Strings";

interface SearchBarProps {
    onSearch: (value: string) => void;
}

export default function SerachBar({onSearch}: SearchBarProps){
    const [value, setValue] = useState("");

    return (
        <div className="search-bar-container">
            <input 
                className="search-input"
                type="text" 
                placeholder="Search Pokemon"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
            <button className="search-btn" onClick={() => onSearch(value)}>{SEARCH}</button>
        </div>
    );
}