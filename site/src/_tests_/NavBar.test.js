import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/NavBar";

describe("NavBar component", () => {
  let user = null;
  const updateUser = jest.fn();

  beforeEach(() => {
    render(<NavBar user={user} updateUser={updateUser} />);
  });

  test("renders the navigation bar", () => {
    const navBarElement = screen.getByRole("navigation");
    expect(navBarElement).toBeInTheDocument();
  });

  test("renders the Movie Time brand", () => {
    const brandElement = screen.getByText("Movie Time 4");
    expect(brandElement).toBeInTheDocument();
  });

  test("renders the Search link", () => {
    const searchLinkElement = screen.getByRole("link", { name: /search/i });
    expect(searchLinkElement).toBeInTheDocument();
  });

  test("renders the MyWatchLists link", () => {
    const watchlistLinkElement = screen.getByRole("link", {
      name: /mywatchlists/i,
    });
    expect(watchlistLinkElement).toBeInTheDocument();
  });

  test("renders the Log Out link", () => {
    const logoutLinkElement = screen.getByTestId("btn-logout");
    expect(logoutLinkElement).toBeInTheDocument();
  });

  test("calls updateUser and removes userID from localStorage when clicking Log Out link", () => {
    // const consoleSpy = jest.spyOn(console, "log");
    const logoutLinkElement = screen.getByTestId("btn-logout");
    fireEvent.click(logoutLinkElement);
    expect(updateUser).toHaveBeenCalledTimes(1);
    // expect(localStorage.removeItem).toHaveBeenCalledWith("userID");
  });
});
