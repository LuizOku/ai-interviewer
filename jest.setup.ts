// Configure testing library
import "@testing-library/jest-dom";
import { jest, afterEach } from "@jest/globals";
import React from "react";

// Mock next/navigation
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
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
const mockResponse = {
  json: () => Promise.resolve([]),
  ok: true,
  status: 200,
  statusText: "OK",
} as Response;

(global.fetch as jest.Mock) = jest.fn(() => Promise.resolve(mockResponse));

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
