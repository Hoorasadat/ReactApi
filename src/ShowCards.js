import { useState, useEffect } from "react";
import Scroll from './Scroll';
import CardList from './CardList';
import ErrorBoundry from './ErrorBoundry';
import Pagination from "./Pagination";

const PAGE_SIZES = [5, 10, 20];
const MIN_PAGE_SIZE = 5;

function ShowCards(props) {
    const { people } = props;

    const totalCount = people.length;

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPaginationData, setCurrentPaginationData] = useState(people.slice(0, MIN_PAGE_SIZE));
    const [pageSize, setPageSize] = useState(MIN_PAGE_SIZE);
    const [lastPage, setLastPage] = useState(Math.ceil(totalCount / pageSize));

    const updatePage = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        setLastPage(Math.ceil(totalCount / size));
        const indexOfLastRecord = page * size;
        const indexOfFirstRecord = indexOfLastRecord - size;
        setCurrentPaginationData(people.slice(indexOfFirstRecord, indexOfLastRecord));
    };

    const updateRowsPerPage = (size) => {
        setCurrentPage(1);
        setPageSize(size);
        setLastPage(Math.ceil(totalCount / size));
        updatePage(1, size);
    };

    useEffect(() => {
        updatePage(currentPage,pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[people]);

    return(
        <div>
            <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={updatePage}
            onPageSizeOptionChange={updateRowsPerPage}
            pageSize={pageSize}
            pageSizeOptions={PAGE_SIZES}
            totalCount={totalCount}
          />

            <Scroll>
                <ErrorBoundry>
                    <CardList currentPageData={currentPaginationData}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    )
}

export default ShowCards;
