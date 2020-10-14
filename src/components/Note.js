import React from 'react';

function Note(props) {
    const {id, content, removeHandler} = props;
    return(
        <div id={id}>
            <textarea value={content} readOnly/>
            <button className="removeBtn" onClick={() => removeHandler(id)}>x</button>
        </div>
    )
}

export default Note;