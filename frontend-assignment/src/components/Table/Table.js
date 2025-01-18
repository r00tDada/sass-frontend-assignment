import React, { memo } from "react";

import { RECORDS_PER_PAGE, TABLE_HEADERS } from "../../constants/app";
import styles from "./table.module.css";

const Table = (props) => {
  const { data, currentPage } = props;

  const start = (currentPage - 1) * RECORDS_PER_PAGE;
  const currrentPageData = data?.slice(start, start + RECORDS_PER_PAGE);

  return (
    currrentPageData.length > 0 && (
      <div
        style={{ minHeight: `${(RECORDS_PER_PAGE + 1) * 44}px` }}
        role="region"
        aria-labelledby="table-title"
        tabIndex="0"
      >
        <table
          id="table-title"
          className={styles.projectTable}
          role="table"
          aria-label="Highly Rated Kickstarter Project Table"
        >
          <thead>
            <tr>
              <th scope="col">{TABLE_HEADERS.S_NO}</th>
              <th scope="col">{TABLE_HEADERS.PERCENTAGE_FUNDED}</th>
              <th scope="col">{TABLE_HEADERS.AMOUNT_PLEDGED}</th>
            </tr>
          </thead>
          <tbody>
            {currrentPageData.map((project) => (
              <tr key={project["s.no"]}>
                <td>{project["s.no"]}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default memo(Table);
