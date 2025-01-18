import React, { useState, useEffect, useCallback } from "react";

import { API_URL, RECORDS_PER_PAGE } from "./constants/app";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching data from the provided URL
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          setError("No data available");
          setProjects([]);
          return;
        }

        setProjects(data);
      } catch (error) {
        setError(error.message || "Failed to fetch data. Please try again...");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / RECORDS_PER_PAGE);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages]);

  return (
    <div className="App">
      <h2 className="headerTitle" tabIndex="0">
        Highly Rated Kickstarter Projects
      </h2>
      {isLoading && <p role="status">Loading...</p>}
      {error && (
        <p role="alert" className="error" tabIndex="0">
          {error}
        </p>
      )}
      {!isLoading && !error && projects.length > 0 && (
        <>
          <Table data={projects} currentPage={currentPage} />
          <Pagination
            handlePrev={handlePrev}
            handleNext={handleNext}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default App;
