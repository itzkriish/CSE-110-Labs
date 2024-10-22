import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

test("renders all to-do list items", () => {
    render(<ToDoList />);
  
    dummyGroceryList.forEach((item) => {
      const listItem = screen.getByText(item.name);
      expect(listItem).toBeInTheDocument();
    });
  });

test("updates number of checked items", () => {
  render(<ToDoList />);

  const firstItemCheckbox = screen.getAllByRole("checkbox")[0];
  fireEvent.click(firstItemCheckbox);

  const itemsBoughtText = screen.getByText(/Items bought:/);
  expect(itemsBoughtText).toHaveTextContent("1");
});

test("updates count when item is unchecked", () => {
    render(<ToDoList />);
  
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[0]);
  
    const itemsBoughtText = screen.getByText(/Items bought:/);
    expect(itemsBoughtText).toHaveTextContent("0");
});
