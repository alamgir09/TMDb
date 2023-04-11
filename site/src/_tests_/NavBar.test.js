import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/NavBar";

var localStorageMock = (function () {
  var store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("<NavBar />", () => {
  test("logout button should set local storage to null", () => {
    const setItemSpy = jest.spyOn(window.localStorage, "setItem");
    const { getByTestId } = render(<NavBar />);

    const btnLogout = screen.getByTestId("btn-logout");
    fireEvent.click(btnLogout);

    expect(setItemSpy).toHaveBeenCalledWith("userID", "null");
    expect(localStorage.getItem("userID")).toBe("null");
  });
});
