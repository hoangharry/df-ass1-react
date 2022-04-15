import { useState } from "react";
import DropDown from "./DropDown";
import "./SearchBar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { getReposOrg, getReposOrgByStars, getReposUser, getReposUserByStars } from "../service/search";

const SearchBar = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [keywords, setKeywords] = useState('');
    const inputHandler = (e) => {
        const searchWords = e.target.value
        setKeywords(searchWords);
        if (searchWords === '') {
            setFilteredData([]);
        }
        console.log(keywords);
        // getReposOrg('dwarvesf');
        // getReposOrgByStars('dwarvesf');
        // getReposUser('gaearon');
        // getReposUserByStars('gaearon');
        
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input 
                    type="text"
                    onChange={inputHandler}
                    placeholder="Search here..."    
                />
                <div className="searchIcon">
                    <AiOutlineSearch/>
                </div>
            </div>
            { filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map((value) => {
                        return (
                            <a className="dataItem" href={value}>
                                <p>{value}</p>
                            </a>
                        );
                    })}
                </div>
            )}
            {/* <DropDown data={data} /> */}
        </div>
    )
}

export default SearchBar;