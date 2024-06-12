import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import App from "../App.tsx"
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();


beforeEach(() => {
  fetchMock.resetMocks();
});
  
  test("Renders the main page", () => {
    render(<App />);
    expect(true).toBeTruthy();
})

test("Exist the readTheDocs text in the document", () => {
    render(<App />);
    const text = screen.getByTitle('read-the-docs');
    expect(text).toBeInTheDocument();
})

