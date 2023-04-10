import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/navbar";
import mediaQuery from "css-mediaquery";

function createMatchMedia(width: Number) {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

function resizeScreen(width: Number) {
  window.matchMedia = createMatchMedia(width);
}

describe("Navbar", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders a Header", () => {
    render(<Navbar />);

    const heading = screen.getByTestId("navbar-brand-name");

    expect(heading).toBeInTheDocument();
  });

  it("renders a Link", () => {
    render(<Navbar />);

    const links = screen.getAllByTestId("navbar-link");

    expect(links.length).toBe(4);
  });

  it("renders a Top Header", () => {
    jest.useFakeTimers();
    render(<Navbar />);

    const heading = screen.getByTestId("navbar-top-header");

    expect(heading).toBeInTheDocument();

    
    act(() => {
      jest.advanceTimersByTime(3000);
    });


    expect(heading).toBeInTheDocument();
  });

  it("renders a Navbar in mobile", () => {
    resizeScreen(400);
    render(<Navbar />);

    const heading = screen.getByTestId("navbar-mobile");
    fireEvent.click(screen.getByTestId("navbar-mobile-toggle"));

    expect(heading).toBeInTheDocument();
  });

  it("renders a Navbar button", () => {
    render(<Navbar />);

    const heading = screen.getByTestId("navbar-button");

    expect(heading).toBeInTheDocument();
  });
});
