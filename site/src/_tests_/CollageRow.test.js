import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CollageRow from "../components/CollageRow";
import { getNumImages, getImageURLs } from "../components/CollageComponent";

describe("CollageRow component", () => {
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const startIndex = 0;
  const numColumns = 3;
  const width = 33.33;

  it("renders a row of images with correct styles", () => {
    const { getAllByRole } = render(
      <CollageRow startIndex={startIndex} numColumns={numColumns} images={images} width={width} />
    );

    const imageElements = getAllByRole("img");

    expect(imageElements).toHaveLength(3);
    expect(imageElements[0]).toHaveAttribute("src", "image1.jpg");
    expect(imageElements[1]).toHaveAttribute("src", "image2.jpg");
    expect(imageElements[2]).toHaveAttribute("src", "image3.jpg");

    const rowElement = imageElements[0].parentElement.parentElement;

    expect(rowElement).toHaveClass("vRow");

    const columnElements = rowElement.children;

    expect(columnElements).toHaveLength(3);
    expect(columnElements[0]).toHaveClass("vCol");
    expect(columnElements[1]).toHaveClass("vCol");
    expect(columnElements[2]).toHaveClass("vCol");

    //    expect(columnElements[0]).toHaveStyle({ transform: 'rotate(12deg)'} || { transform: 'rotate(-12deg)'} );
    //    expect(columnElements[1]).toHaveStyle({ width: '33.33%' } );
    //    expect(columnElements[2]).toHaveStyle({ width: '33.33%' } );
  });
});
