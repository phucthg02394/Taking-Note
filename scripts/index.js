import { GetNotes } from "./storage.js"

const notesContainer = document.querySelector(".notes-container");

function renderNotes() {
    const notes = GetNotes();

    if (notes.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Ôi chưa có gì cả. Hãy bấm + để bắt đầu";
        notesContainer.append(emptyMessage);
    }

    notes.forEach(note => {
        const noteElement = document.createElement("a");
        noteElement.className = "note";
        noteElement.href = `./pages/noteDetails.html?id=${encodeURIComponent(note.id)}`;
        
        const title = document.createElement("h2");
        title.textContent = note.title;

        const content = document.createElement("p");
        content.textContent = note.content;

        noteElement.append(title, content);
        notesContainer.append(noteElement);
    });
}

renderNotes();