import React from "react";

import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
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
        ]),
    })
  );
});

describe("App Component", () => {
  test("renders header title", () => {
    render(<App />);
    const headerElement = screen.getByRole("heading", {
      name: "Highly Rated Kickstarter Projects",
    });
    expect(headerElement).toBeInTheDocument();
  });

  test("displays loading text while fetching data", async () => {
    render(<App />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  test("fetches and displays project data", async () => {
    render(<App />);

    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();

    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage funded")).toBeInTheDocument();
    expect(screen.getByText("Amount pledged")).toBeInTheDocument();

    expect(screen.getByText("153")).toBeInTheDocument();
    expect(screen.getByText("45959")).toBeInTheDocument();
  });

  test("displays error message if fetch fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch data"))
    );

    render(<App />);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to fetch data"
      )
    );
  });

  test("displays 'No projects to display' if data is empty", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    );

    render(<App />);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("No data available")
    );
  });
});
