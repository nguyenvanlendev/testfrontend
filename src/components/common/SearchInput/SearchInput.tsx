import "./SearchInput.scss"
import SearchIcon from "./../../../assets/img/draft/icon-search.png";


export const SearchInput = () => {
    return <div className="search-input">
        <input placeholder="Tìm môn học..."/>
        <div className="search-input__icon">
            <img src = {SearchIcon} alt = ""/>
        </div>
    </div>
}