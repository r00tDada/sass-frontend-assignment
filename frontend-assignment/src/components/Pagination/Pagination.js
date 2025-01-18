import React, { memo } from "react";

import { PAGINATION } from "../../constants/app";
import styles from "./pagination.module.css";

const Pagination = (props) => {
  const { currentPage, handlePrev, handleNext, totalPages } = props;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {PAGINATION.PREVIOUS}
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage >= totalPages}
      >
        {PAGINATION.NEXT}
      </button>
    </div>
  );
};

export default memo(Pagination);
