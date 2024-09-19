import { render } from "@testing-library/react";
import { useRouter } from "next/router";
import App from "./_app";
import VendorLayout from "../layouts/VendorLayout";
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer";

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock the Head component from next/head
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }) => <>{children}</>,
  };
});

describe("App Component", () => {
  const Component = () => <div>Test Component</div>;
  const pageProps = {};

  it("renders VendorLayout when on a vendor page", () => {
    useRouter.mockImplementation(() => ({
      pathname: "/vendor/stylematch",
    }));

    const { getByText } = render(
      <App Component={Component} pageProps={pageProps} />
    );

    expect(getByText("Test Component")).toBeInTheDocument();
    expect(getByText("Test Component").closest(VendorLayout)).toBeTruthy();
  });

  it("renders Navbar and Footer when not on a vendor page", () => {
    useRouter.mockImplementation(() => ({
      pathname: "/some-other-page",
    }));

    const { getByText } = render(
      <App Component={Component} pageProps={pageProps} />
    );

    expect(getByText("Test Component")).toBeInTheDocument();
    expect(getByText("Test Component").closest(Navbar)).toBeTruthy();
    expect(getByText("Test Component").closest(Footer)).toBeTruthy();
  });

  it("renders the Head component with correct title and meta", () => {
    useRouter.mockImplementation(() => ({
      pathname: "/some-page",
    }));

    const { getByText, getByRole } = render(
      <App Component={Component} pageProps={pageProps} />
    );

    expect(getByText("StyleMatch")).toBeInTheDocument();
    expect(getByRole("link", { name: /favicon/i })).toHaveAttribute(
      "href",
      "/favicon.jpg"
    );
    expect(
      document.querySelector('meta[name="description"]').getAttribute("content")
    ).toBe("Grow your fashion business, one sale at a time");
  });
});
