import { GetNotes, DeleteNote } from "./storage.js"

const notesContainer = document.querySelector(".notes-container");

function renderNotes() {
    notesContainer.innerHTML = "";
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

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./assets/delete.svg";
        deleteIcon.alt = "Xóa";
        deleteIcon.className = "delete-btn";
        deleteIcon.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (window.confirm("Bạn có muốn xóa ghi chú này không ?")) {
                DeleteNote(note.id);
                renderNotes();
            }
        });

        noteElement.append(title, content, deleteIcon);
        notesContainer.append(noteElement);
    });
}

renderNotes();