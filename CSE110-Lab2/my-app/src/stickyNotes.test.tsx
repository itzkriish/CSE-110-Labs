import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });
});

test("reads all notes", () => {
    render(<StickyNotes />);

    const noteTitles = dummyNotesList.map((note) => note.title);
    noteTitles.forEach((title) => {
      const noteTitleElement = screen.getByText(title);
      expect(noteTitleElement).toBeInTheDocument();
    });
  
    const displayedNotes = screen.getAllByRole("heading", { level: 2 });
    expect(displayedNotes.length).toBe(dummyNotesList.length);
  });

test("updates note", () => {
  render(<StickyNotes />);
  const firstNoteTitle = screen.getByText(dummyNotesList[0].title);
  const firstNoteContent = screen.getByText(dummyNotesList[0].content);

  fireEvent.blur(firstNoteTitle, { target: { innerText: "Updated Note Title" } });
  fireEvent.blur(firstNoteContent, { target: { innerText: "Updated Note Content" } });

  expect(screen.getByText("Updated Note Title")).toBeInTheDocument();
  expect(screen.getByText("Updated Note Content")).toBeInTheDocument();
});

test("deletes a note", () => {
    render(<StickyNotes />);
  
    const firstNoteTitle = dummyNotesList[0].title;
    const firstNoteDeleteButton = screen.getAllByText("x")[0];
  
    fireEvent.click(firstNoteDeleteButton);
  
    expect(screen.queryByText(firstNoteTitle)).not.toBeInTheDocument();
  });

test("don't create a note with no title or content", () => {
  render(<StickyNotes />);

  const createNoteButton = screen.getByText("Create Note");
  fireEvent.click(createNoteButton);

  const newNote = screen.queryByText("New Note");
  expect(newNote).not.toBeInTheDocument();
});

test("updates note multiple times", () => {
    render(<StickyNotes />);
  
    const firstNoteTitle = screen.getByText(dummyNotesList[0].title);
    
    fireEvent.blur(firstNoteTitle, { target: { innerText: "First Edit" } });
    expect(screen.getByText("First Edit")).toBeInTheDocument();
    fireEvent.blur(firstNoteTitle, { target: { innerText: "Second Edit" } });
    expect(screen.getByText("Second Edit")).toBeInTheDocument();
  });