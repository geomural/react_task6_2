import React, {useRef, useState} from 'react';
import './App.css';
import Note from './components/Note';

function App() {
  const noteRef = useRef();
  const [notes, setNotes] = useState([]);
  let idCounter = 0;

  const getNotes = () => {
    fetch(process.env.REACT_APP_NOTES_URL)
    .then(response => response.json())
    .then(response => {
      updateNotes(response);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const removeNote = (id) => {
    fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, {method: 'DELETE'})
    .then(response => {
      getNotes();
    })
    .catch((error) => {
      console.error('DELETE Error:', error);
    });
  }

  const updateNotes = (allNotes) =>
  {
    if (allNotes) {
      let data = allNotes.map(el => <Note key={el.id} id={el.id} content={el.content} removeHandler={removeNote} />);
      setNotes(data);
    }    
  }

  const addNote = () => {
    if (!noteRef.current.value) {
      alert("New note is empty");
      return;
    }

    let newNote = {
      id: ++idCounter,
      content: noteRef.current.value
    }

    fetch(process.env.REACT_APP_NOTES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'       
      },
      body: JSON.stringify(newNote),
    })
    .then(response => {
      getNotes();
      noteRef.current.value = "";
    });
  }

  return (
    <div className="App">
      <div className="headerDiv">
        <h3>Notes</h3>
        <button className="updateBtn" onClick={getNotes}></button>
      </div>
      <div className="notesDiv">
        {notes}
      </div>
      <hr/>
      <div className="addNoteDiv">        
        <div>          
          <p>New note</p>
          <button className="addBtn" onClick={addNote}>►</button>
        </div>
        <textarea ref={noteRef}></textarea>
      </div>
    </div>
  );
}

export default App;
