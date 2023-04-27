import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavBar from "../components/NavBar";
import { BrowserRouter } from "react-router-dom";
import TestMontageButton from "../pages/TestMontageButtonPage";
import userEvent from "@testing-library/user-event";

test("full app rendering/navigating", async () => {
  const user = userEvent.setup();
  render(<TestMontageButton />, { wrapper: BrowserRouter });

  // verify page content for expected route after navigating
  await waitFor(() => user.click(screen.getByText(/Create Montage/i)));
  expect(screen.getByText(/Montage/)).toBeInTheDocument();
});

test("renders button and navigates to Montage with movieIDList state when clicked", () => {
  const movieIDList = ["1", "2", "3"];
  const navigate = jest.fn();

  const { getByText } = render(
    <div>
      <button
        onClick={() => {
          navigate("/Montage", { state: { movieIDList: movieIDList } });
        }}
      >
        {" "}
        Create Montage{" "}
      </button>
    </div>
  );

  fireEvent.click(getByText("Create Montage"));

  expect(navigate).toHaveBeenCalledWith("/Montage", { state: { movieIDList: ["1", "2", "3"] } });
});
