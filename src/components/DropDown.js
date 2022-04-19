import { AiOutlineFork, AiOutlineStar, AiOutlineEye } from "react-icons/ai";
import './DropDown.css';
const DropDown = ({ data, loadMore }) => {
    const scrollHandler = (e) => {
        console.log('scrollHandler');
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            console.log('to bottom');
            loadMore();
        }
    }
    return (
        <div className="dataResult" onScroll={scrollHandler}>
                    {data.map((value) => {
                        return (
                            <a className="dataItem" href={value.svn_url} key={value.id}>
                                <p>
                                    {value.full_name}
                                </p>
                                <div className="groupIcons">
                                <div className="iconType"><AiOutlineStar/><span>{value.stargazers_count}</span></div>
                                <div className="iconType"><AiOutlineFork/><span>{value.forks_count}</span></div>
                                <div className="iconType"><AiOutlineEye/><span>{value.watchers_count}</span></div>
                                </div>
                                
                            </a>
                        );
                    })}
                </div>
    );
}

export default DropDown;