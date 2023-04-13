import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Montage from "../pages/Montage";
import NavBar from "../components/NavBar";
import CollageComponent from "../components/CollageComponent";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test("renders Montage component with correct title", () => {
  const movieIDList = ["1", "2", "3"]; // sample data
  const path = "/montage";

  const { getByText } = render(
    <MemoryRouter initialEntries={[{ pathname: path, state: { movieIDList } }]}>
    <Routes>
      <Route path="/montage" element={< Montage/>} />
    </Routes>
    </MemoryRouter>
  );

  const titleElement = getByText(/Montage/i);
  expect(titleElement).toBeInTheDocument();
});