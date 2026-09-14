export function GetNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    return notes;
}

export function GetNoteById(id) {
    const notes = GetNotes();
    const index = notes.findIndex((note) => note.id === id);
    return notes[index];
}

export function AddNote(title, content = "") {
    if (!title || !title.trim()) {
        throw new Error("Tiêu đề không được trống");
    }

    const now = new Date().toISOString();
    const newNote = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content,
        createdAt: now,
        updatedAt: now
    }


    const notes = GetNotes();
    notes.push(newNote);
    localStorage.setItem('notes',JSON.stringify(notes));
    return newNote;
}

export function EditNote(id, title, content ="") {
    if (!title || !title.trim()) {
        throw new Error("Tiêu đề không được trống");
    }

    const notes = GetNotes();
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
        throw new Error("Không tìm thấy Note");
    }

    const updatedNote = {
        ...notes[index],
        title: title.trim(),
        content,
        updatedAt: new Date().toISOString()
    }

    notes[index] = updatedNote;
    localStorage.setItem("notes", JSON.stringify(notes));
    return updatedNote;
}

export function DeleteNote(id) {
    const notes = GetNotes().filter((note) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
}