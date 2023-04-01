import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  test("renders page numbers correctly", () => {
    const { getByText } = render(
      <Pagination postsPerPage={10} totalPosts={100} paginate={() => {}} />
    );

    // Check if the first page number is rendered
    expect(getByText("1")).toBeInTheDocument();

    // Check if the last page number is rendered
    expect(getByText("10")).toBeInTheDocument();
  });

  test("calls paginate function on click", () => {
    const paginateMock = jest.fn();
    const { getByText } = render(
      <Pagination postsPerPage={10} totalPosts={100} paginate={paginateMock} />
    );

    // Click on the third page number
    fireEvent.click(getByText("3"));

    // Check if the paginate function is called with the correct argument
    expect(paginateMock).toHaveBeenCalledWith(3);
  });
});
