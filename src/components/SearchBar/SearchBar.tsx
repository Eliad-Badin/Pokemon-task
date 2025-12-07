import "./SearchBar.css";

export default function SerachBar(){
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search Pokemon"/>
            <button className="search-btn">Search</button>
        </div>
    );
}