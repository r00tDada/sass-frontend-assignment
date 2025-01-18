import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import Pagination from "./Pagination";

jest.mock("../../constants/app", () => ({
  PAGINATION: {
    PREVIOUS: "Previous",
    NEXT: "Next",
  },
}));

describe("Pagination Component", () => {
  const mockPrev = jest.fn();
  const mockNext = jest.fn();

  test("renders pagination with correct text", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handlePrev={mockPrev}
        handleNext={mockNext}
      />
    );

    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  test("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handlePrev={mockPrev}
        handleNext={mockNext}
      />
    );

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeEnabled();
  });

  test("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        handlePrev={mockPrev}
        handleNext={mockNext}
      />
    );

    expect(screen.getByText("Previous")).toBeEnabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("calls handlePrev function when previous button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        handlePrev={mockPrev}
        handleNext={mockNext}
      />
    );

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);

    expect(mockPrev).toHaveBeenCalledTimes(1);
  });

  test("calls handleNext function when next button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        handlePrev={mockPrev}
        handleNext={mockNext}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
