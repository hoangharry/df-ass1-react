import './SortFields.css';
import { SORT_ORIGINAL, SORT_POPULAR, SORT_STARS } from "../constant";

const SortFields = ({ sortType, changeSortType }) => {
    return (
        <div className="checkboxes">
            <label>
                <input 
                    type="checkbox" 
                    id="boxStars" 
                    name="boxStars"
                    checked={sortType === SORT_STARS}
                    onChange={() => changeSortType(SORT_STARS)}
                ></input>
                <span>Most stars</span>
            </label>
            <label>
                <input 
                    type="checkbox" 
                    id="boxPopular" 
                    name="boxPopular"
                    checked={sortType === SORT_POPULAR}
                    onChange={() => changeSortType(SORT_POPULAR)}
                ></input>
                <span>Most popular</span>
            </label>
            <label>
                <input 
                    type="checkbox" 
                    id="boxUnforked" 
                    name="boxUnforked"
                    checked={sortType === SORT_ORIGINAL}
                    onChange={() => changeSortType(SORT_ORIGINAL)}    
                ></input>
                <span>Most popular original work</span>
            </label>
        </div>
    )
}

export default SortFields;