// Configure testing library
import "@testing-library/jest-dom";
import React from "react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLImageElement> &
      React.ImgHTMLAttributes<HTMLImageElement>
  ) => {
    return React.createElement("img", props);
  },
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;
