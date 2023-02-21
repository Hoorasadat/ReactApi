import PropTypes from 'prop-types';
export const DOTS = "...";

function usePagination(currentPage, pageSize, totalCount) {
    if (!currentPage) {
      currentPage = 1;
    };
    const SIBILING_COUNT = 1;
    const lastPage = Math.ceil(totalCount / pageSize)
    const leftSiblingIndex = Math.max(currentPage - SIBILING_COUNT, 1);
    const rightSiblingIndex = Math.min(currentPage + SIBILING_COUNT, lastPage);
    const shouldShowLeftDots = leftSiblingIndex > 1 && lastPage > 3;
    const shouldShowRightDots = rightSiblingIndex < lastPage  && lastPage > 3;
    const firstPageIndex = 1;
    const lastPageIndex = lastPage;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * SIBILING_COUNT;
      const leftRange = [...Array(leftItemCount).keys()].map(i => i + leftSiblingIndex)
      return [...leftRange, DOTS, lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * SIBILING_COUNT;
      const rightRange = [...Array(rightItemCount).keys()].map(i => i + lastPage - rightItemCount + 1)
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = [...Array(3).keys()].map(i => i + leftSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    if (!shouldShowLeftDots && !shouldShowRightDots) {
      if (lastPage === 1){
        return [1];
      }
      if (lastPage === 2){
        return [1, 2];
      }
      if (lastPage === 3){
        return [1, 2, 3];
      }
    }
}

usePagination.propTypes = {
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
};

usePagination.defaultProps = {
  currentPage: 1,
  pageSize: 15,
  totalCount: 1,
};

export default usePagination;
