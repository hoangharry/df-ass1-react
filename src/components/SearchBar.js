import { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import "./SearchBar.css";
import { AiOutlineSearch } from "react-icons/ai";
import SortFields from "./SortFields";
import { SORT_ORIGINAL, SORT_STARS, SORT_POPULAR } from "../constant";
import {  getReposByStars } from "../service/search";
import { sortPopular } from "../service/sortFn";

const SearchBar = () => {
    const cache = useRef({});
    const [filteredData, setFilteredData] = useState([]);
    const [sortType, setSortType] = useState(SORT_STARS);
    const [keywords, setKeywords] = useState('');
    const [loadMore, setLoadMore] = useState(false);
    let inputTimeout = undefined;
    let patt = /^(\w|_)+$/;
    
    const inputHandler = (e) => {
        e.preventDefault();
        
        if (inputTimeout !== undefined) {
            console.log('come to clear');
            console.log(inputTimeout);
            clearTimeout(inputTimeout);
        }

        inputTimeout = setTimeout(() => {
            const searchWords = e.target.value
            setKeywords(searchWords);
            if (searchWords === '') {
                setFilteredData([]);
                cache.current = {};
            }
            console.log('keyWords', keywords);
            console.log('searchWords', searchWords)
            
        }, 1000);
        
    };

    const getRepos = async (query, isOrigin = false) => {
        let promises = [];

        for (let i = 0; i < query.length; i++) {
            if (cache.current[query[i]]) {
                //has cached 
                if (cache.current[query[i]].total > cache.current[query[i]].data.length) {
                    const page = Math.floor(cache.current[query[i]].data.length/30 + 1);
                    promises.push(getReposByStars(query[i], page, isOrigin));
                    // if (!isOrigin) {
                    //     promises.push(getReposByStars(query[i], page));
                    // } else {
                    //     promises.push(getOriginalRepos(query[i], page));
                    // }
                    
                } else {
                // has retrieve all
                    promises.push(0);
                }
            } else {
                // no data yet
                promises.push(getReposByStars(query[i], 1, isOrigin));
                // if (!isOrigin) {
                //     promises.push(getReposByStars(query[i], 0));
                // } else {
                //     promises.push(getOriginalRepos(query[i], 0));
                // }
            }
            
        }
        // call api
        let data = await Promise.all(promises);
        data = await Promise.all(promises);
        // save data to cache
        for (let i = 0; i < query.length; i++) {
            if (data[i] === 0) {
                continue;
            }
            if (cache.current[query[i]]) {
                cache.current[query[i]] = {
                    data: [...cache.current[query[i]].data, ...data[i].data.items],
                    total: data[i].data.total_count,
                }
            } else {
                cache.current[query[i]] = {
                    data: data[i].data.items,
                    total: data[i].data.total_count,
                }
            }
        }
    }

    const sortDataFilter = async (kw) => {
        const query = kw.split(' ');
        for (let i = 0; i < query.length; i++) {
            if (query[i] === '') {
                query.splice(i, 1);
            }
            if (!patt.test(query[i])) {
                query.splice(i, 1);
            }
        }
        const isOrigin = sortType === SORT_ORIGINAL
        await getRepos(query, isOrigin);
        let result = [];
        // filter result
        for (let i = 0; i < query.length; i++) {
            result = [...result, ...cache.current[query[i]].data];
        }
        if (sortType === SORT_STARS) {
            result.sort((a, b) => { return b.stargazers_count - a.stargazers_count});
        }

        if (sortType === SORT_POPULAR || sortType === SORT_ORIGINAL) {
            result.sort(sortPopular);
        }

        console.log('result', result);
        setFilteredData(result);
    }

    useEffect(() => {
        console.log('effect1');
        if (keywords === '') {
            return;
        }
        sortDataFilter(keywords);
        
    }, [sortType, keywords]);

    useEffect(() => {
        console.log('effect2');
        if (loadMore) {
            sortDataFilter(keywords);
            setLoadMore(false);
        }      
    }, [loadMore, keywords]);

    const changeSortTypeHandler = (value) => {
        console.log('changeSrotType');
        setSortType(value);
        document.getElementById('inputText').value = '';
        setKeywords('');
        setFilteredData([]);
        cache.current = {};
    }

    const loadMoreSwitch = () => {
        setLoadMore(true);
    }

    return (
        <div className="search">
            <SortFields 
                sortType={sortType}
                changeSortType={changeSortTypeHandler}
            />
            <div className="searchInputs">
                <input 
                    id="inputText"
                    type="text"
                    onChange={inputHandler}
                    placeholder="Search here..."    
                />
                <div className="searchIcon">
                    <AiOutlineSearch/>
                </div>
            </div>
            { filteredData.length !== 0 && (
                <DropDown data={filteredData} loadMore={loadMoreSwitch}/>
            )}
            
            
        </div>
    )
}

export default SearchBar;