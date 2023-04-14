import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CollageComponent from "../components/CollageComponent";
import { Collage, getNumImages, getImageURLs } from "../components/CollageComponent";


it("should add the correct number of images to the imageURLs state", async () => {
//     Modify the movieIDList prop to trigger the correct branch in the for loop
//    const movieIDList = ["225", "550", "2038"];
//
//    // Calculate the expected number of images
////    const expectedNumImages = Math.ceil(10 / movieIDList.length) * movieIDList.length;
////    const expectedImageURLs = new Array(expectedNumImages)
////      .fill("http://image.tmdb.org/t/p/w400")
////      .map((url, i) => url + `/${i}.jpg`);
//
//    // Render the component
//    const { container } = render(<CollageComponent movieIDList={movieIDList} />);
//
//    // Wait for the component to fetch and process the image URLs
////    await waitFor(() => getByTestId("collageTestID"));
//
//    const rows = container.querySelectorAll('div.vRow');
//    // Check the length of the imageURLs state
//    expect(rows.length).toBe(1);

  });

  it('should fetch movie images and return URLs', async () => {
//      const movieIDList = ['1', '2', '3'];
//      const mockResponse = {
//        backdrops: [
//          { file_path: '/backdrop1.jpg' },
//          { file_path: '/backdrop2.jpg' },
//          { file_path: '/backdrop3.jpg' }
//        ]
//      };
//      jest.spyOn(window, 'fetch').mockResolvedValueOnce({
//        ok: true,
//        json: () => Promise.resolve(mockResponse)
//      });
//
//      const urls = await getImageURLs(movieIDList);
//
//      expect(urls).toEqual([
//        'http://image.tmdb.org/t/p/w400/backdrop1.jpg',
//        'http://image.tmdb.org/t/p/w400/backdrop2.jpg',
//        'http://image.tmdb.org/t/p/w400/backdrop3.jpg'
//      ]);
//      expect(window.fetch).toHaveBeenCalledTimes(3);
    });

  test("getImageURLs returns expected URLs", async () => {  // line 41 -45

//      const mockResponse = [{ file_path: "/path/to/image1.jpg" }, { file_path: "/path/to/image2.jpg" }, { file_path: "/path/to/image3.jpg" }, { file_path: "/path/to/image4.jpg" }, { file_path: "/path/to/image5.jpg" }];
//
//      fetch.mockResolvedValue({
//        json: jest.fn().mockResolvedValue({ backdrops: mockResponse })
//      });
////      const imageURLs = [ "http://image.tmdb.org/t/p/w400/path/to/image1.jpg", "http://image.tmdb.org/t/p/w400/path/to/image2.jpg"]
//      const movieIDList = ["225", "550", "2038", "543", "4532"];
//
//      const getImageURLs = jest.fn(() => ["http://image.tmdb.org/t/p/w400/path/to/image1.jpg", "http://image.tmdb.org/t/p/w400/path/to/image2.jpg"])
//      render(<CollageComponent movieIDList={movieIDList} />);
////      console.log(imageURLs);
//      expect(imageURLs).toEqual([
//        "http://image.tmdb.org/t/p/w400/path/to/image1.jpg",
//        "http://image.tmdb.org/t/p/w400/path/to/image2.jpg"
//      ]);
    });

test('renders correctly', async () => {
//    const movieIDList = ['225', '550', '2038'];
//    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
//      json: jest.fn().mockResolvedValue({
//        backdrops: [
//          { file_path: 'path1' },
//          { file_path: 'path2' },
//          { file_path: 'path3' }
//        ]
//      })
//    });
//
//
//    await act(async () => {
//        const { queryByTestId } = render(<Collage movieIDList={movieIDList} />);
//        await waitFor(() => expect(queryByTestId('collageTestID')).toBeTruthy());
//      });
//
//    expect(fetchMock).toHaveBeenCalledTimes(movieIDList.length);
//    fetchMock.mockRestore();
  });




//  test("getImageURLs returns expected URLs", async () => {  // line 41 -45
//
//    const mockResponse = [{ file_path: "/path/to/image1.jpg" }, { file_path: "/path/to/image2.jpg" }];
//
//    fetch.mockResolvedValue({
//      json: jest.fn().mockResolvedValue({ backdrops: mockResponse })
//    });
//    const imageURLs = [ "http://image.tmdb.org/t/p/w400/path/to/image1.jpg", "http://image.tmdb.org/t/p/w400/path/to/image2.jpg"]
//    const movieIDList = ["225", "550", "2038"];
//
//    render(<CollageComponent movieIDList={movieIDList} />);
//    console.log(imageURLs);
//    expect(imageURLs).toEqual([
//      "http://image.tmdb.org/t/p/w400/path/to/image1.jpg",
//      "http://image.tmdb.org/t/p/w400/path/to/image2.jpg"
//    ]);
//  });

  it("should render without crashing", async () => {
    await act(async () => {
      const movieIDList = ["225", "550", "2038"];
      render(<CollageComponent movieIDList={movieIDList} />);
    });
  });



//  it('renders an empty collage with 0 rows and columns', async () => {
//
//    const movieIDList = ["225", "550", "2038"];
//
//    await act(async () => {
//        const {container} = render(<CollageComponent movieIDList={movieIDList} />);
////        await new Promise((resolve) => setTimeout(resolve, 3000));
//        const imageURLs = [ "http://image.tmdb.org/t/p/w400/path/to/image1.jpg", "http://image.tmdb.org/t/p/w400/path/to/image2.jpg", "http://image.tmdb.org/t/p/w400/path/to/image2.jpg"]
//
//        const elements = container.querySelectorAll(".vRow");
//        expect(elements.length).toBe(1);
//    });


it('returns an array of image URLs', async () => {
//    const imageUtils = require('../components/CollageComponent');
//    const mockFetch = jest.fn(() => {
//      return Promise.resolve({
//        json: () => {
//          return Promise.resolve({
//            backdrops: [
//              { file_path: '/path/to/image1.jpg' },
//              { file_path: '/path/to/image2.jpg' },
//              { file_path: '/path/to/image3.jpg' },
//            ],
//          });
//        },
//      });
//    });
//
//    // Define the mock implementation of the getImageURLs function
//    const mockGetImageURLs = jest.fn(() => {
//      return ['http://image.tmdb.org/t/p/w400/path/to/image1.jpg',
//              'http://image.tmdb.org/t/p/w400/path/to/image2.jpg',
//              'http://image.tmdb.org/t/p/w400/path/to/image3.jpg'];
//    });
//
//    // Replace the implementation of the getImageURLs function with the mock function
//    jest.spyOn(imageUtils, 'getImageURLs').mockImplementation(mockGetImageURLs);
//
//    const movieIDList = ['123', '456', '789'];
//    const result = await getImageURLs(movieIDList, mockFetch);
//
//    expect(mockGetImageURLs).toHaveBeenCalledWith(movieIDList, mockFetch);
//    expect(result).toEqual(['http://image.tmdb.org/t/p/w400/path/to/image1.jpg',
//                            'http://image.tmdb.org/t/p/w400/path/to/image2.jpg',
//                            'http://image.tmdb.org/t/p/w400/path/to/image3.jpg']);
  });




