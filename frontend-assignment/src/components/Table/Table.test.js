import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

const mockTableHeaders = {
  S_NO: "S.No",
  PERCENTAGE_FUNDED: "Percentage Funded",
  AMOUNT_PLEDGED: "Amount Pledged",
};

jest.mock("../../constants/app", () => ({
  TABLE_HEADERS: {
    S_NO: "S.No",
    PERCENTAGE_FUNDED: "Percentage Funded",
    AMOUNT_PLEDGED: "Amount Pledged",
  },
  RECORDS_PER_PAGE: 2,
}));

const mockData = [
  {
    "s.no": 0,
    "amt.pledged": 45959,
    blurb:
      "A heartfelt film exploring families and relationships between Korean and African American communities set during the LA Riots",
    by: "Justin Chon",
    country: "US",
    currency: "usd",
    "end.time": "2016-11-09T19:27:32-05:00",
    location: "Los Angeles, CA",
    "percentage.funded": 153,
    "num.backers": "73206",
    state: "CA",
    title: "GOOK - A Korean American LA Riots Film",
    type: "Town",
    url: "/projects/2084768431/gook-a-korean-american-la-riots-film?ref=discovery",
  },
  {
    "s.no": 1,
    "amt.pledged": 214035,
    blurb:
      "A Smartphone Mount That Helps You Capture The Moment With Facial Tracking, Automated Videos and Pictures, Timelapse and Panoramas",
    by: "Stacked",
    country: "US",
    currency: "usd",
    "end.time": "2016-10-30T06:21:30-04:00",
    location: "Los Angeles, CA",
    "percentage.funded": 611,
    "num.backers": "70122",
    state: "CA",
    title: "Picbot - An Automated Motorized Picture And Video Bot",
    type: "Town",
    url: "/projects/1597931194/picbot-an-automated-motorized-picture-and-video-bo?ref=discovery",
  },
  {
    "s.no": 2,
    "amt.pledged": 41025,
    blurb:
      "Who's watching when a fracked oil pipeline sparks the Standing Rock Sioux Nation to lead the biggest indigenous protest in 100 years?",
    by: "Raviv Ullman",
    country: "US",
    currency: "usd",
    "end.time": "2016-11-22T23:30:00-05:00",
    location: "Cannon Ball, ND",
    "percentage.funded": 54,
    "num.backers": "69320",
    state: "ND",
    title: "Standing Ground - A Documentary Film",
    type: "Town",
    url: "/projects/345639715/standing-ground-a-documentary-film?ref=discovery",
  },
];

describe("Table Component", () => {
  test("renders table with correct headers", async () => {
    render(<Table data={mockData} currentPage={1} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(mockTableHeaders.S_NO)).toBeInTheDocument();
    expect(
      screen.getByText(mockTableHeaders.PERCENTAGE_FUNDED)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockTableHeaders.AMOUNT_PLEDGED)
    ).toBeInTheDocument();
  });

  test("renders correct number of rows based on pagination", () => {
    render(<Table data={mockData} currentPage={1} />);

    // Only two records should be displayed per page
    expect(screen.getByText("153")).toBeInTheDocument();
    expect(screen.getByText("45959")).toBeInTheDocument();
    expect(screen.getByText("611")).toBeInTheDocument();
    expect(screen.getByText("214035")).toBeInTheDocument();

    // The third record should be on the second page
    expect(screen.queryByText("54")).not.toBeInTheDocument();
  });

  test("renders correct rows for page second", () => {
    render(<Table data={mockData} currentPage={2} />);

    // The third record should be on the second page
    expect(screen.getByText("54")).toBeInTheDocument();
    expect(screen.getByText("41025")).toBeInTheDocument();

    // The first and second entries should not be on the second page
    expect(screen.queryByText("153")).not.toBeInTheDocument();
    expect(screen.queryByText("611")).not.toBeInTheDocument();
  });

  test("does not render table when there is no data", () => {
    render(<Table data={[]} currentPage={1} />);

    // The table should not be rendered
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
