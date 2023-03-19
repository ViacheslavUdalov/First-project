import s from "../components/Users/Users.module.css";
import React, {useState} from "react";
import classNames from "classnames";
type Props = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}
const Paginator: React.FC<Props> = ({totalItemsCount, pageSize, currentPage,
                       onPageChanged, portionSize = 15}) => {
    let pageCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPageNumber = portionSize * portionNumber;
    return <div>
        {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Previous</button>}

        {pages.filter(p => p >= leftPageNumber && p <= rightPageNumber).map(p => {
            return <span className={classNames({[s.page]: currentPage === p}, s.pages)}
                         onClick={(e) => {
                             onPageChanged(p);
                         }} key={p}>{p}</span>
        })}

        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}
    </div>
}
export default Paginator;