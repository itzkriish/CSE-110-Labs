import './App.css';
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants"; 
import React, { useState } from 'react';
import Heart from 'react-heart';
import { ThemeContext, themes } from "./themeContext";

function App() {
  const [notes, setNotes] = useState(dummyNotesList);
  const [favorites, setFavorites] = useState<Note[]>([]); 
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState<Note>(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const toggleFavorite = (note: Note) => {
    const isFavorite = favorites.some((favNote) => favNote.id === note.id);
    if (isFavorite) {
      setFavorites(favorites.filter((favNote) => favNote.id !== note.id));
    } else {
      setFavorites([...favorites, note]);
    }
  };

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote); 
  }

  const updateNote = (noteId: number, updatedNote: Partial<Note>) => {
    const updatedNotes = notes.map((note) => (note.id === noteId ? { ...note, ...updatedNote } : note));
    const updatedFavorites = favorites.map((favNote) => (favNote.id === noteId ? { ...favNote, ...updatedNote } : favNote));
    setNotes(updatedNotes);
    setFavorites(updatedFavorites);
  }

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    setFavorites(favorites.filter((favNote) => favNote.id !== noteId));
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className='app-container' style={{
           background: currentTheme.background,
           color: currentTheme.foreground,
           padding: "20px"
         }}
      >
        <button onClick={toggleTheme}>Toggle Theme</button>

        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input 
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) => setCreateNote({...createNote, title: event.target.value})}
            required
            />
          </div>
          <div>
             <textarea
               placeholder="Note Content"
               value={createNote.content}
               onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })}
               required
             />
           </div>
          <div>
             <select
               value={createNote.label}
               onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label })}
               required
             >
               <option value={Label.personal}>Personal</option>
               <option value={Label.study}>Study</option>
               <option value={Label.work}>Work</option>
               <option value={Label.other}>Other</option>
             </select>
           </div>
           <div><button type="submit">Create Note</button></div>
        </form>

        <div className="notes-grid">
           {notes.map((note) => (
             <div
               key={note.id}
               className="note-item"
               onClick={() => setSelectedNote(note)}>
               <div className="notes-header">
                 <div style={{ width: '2rem' }}>
                  <Heart
                    isActive={favorites.some((favNote) => favNote.id === note.id)}
                    onClick={() => toggleFavorite(note)}
                  />
                </div>
                <button onClick={() => deleteNote(note.id)}>x</button>
               </div>
               <h2 
               contentEditable="true"
               onBlur={(event) => updateNote(note.id, {title: event.target.innerText})}
               > 
               {note.title} </h2>
               <p
               contentEditable="true"
               onBlur={(event) => updateNote(note.id, {content: event.target.innerText})}
               > {note.content} </p>
               <select
                value={note.label}
                onChange={(event) => updateNote(note.id, {label: event.target.value as Label})}
              >
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
             </div>
           ))}
         </div>
         
         <div>
            <h3>List of favorites:</h3>
            <ul>
              {favorites.map((favNote) => (
                <li key={favNote.id}>{favNote.title}</li>
              ))}
            </ul>
          </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
