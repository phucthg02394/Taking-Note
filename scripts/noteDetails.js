import { GetNoteById, AddNote, EditNote } from "./storage.js"

const params = new URLSearchParams(window.location.search);
const existingNoteId = params.get("id");

const titleInput = document.querySelector("#note-title");
const contentInput = document.querySelector("#note-content");
const saveStatus = document.querySelector("#save-status");

let noteId = existingNoteId;
let saveTimer = null;
let hasSaved = Boolean(existingNoteId);

if (existingNoteId) {
    const note = GetNoteById(existingNoteId);

    if (note) {
        titleInput.value = note.title;
        contentInput.value = note.content
    }
} else {
    noteId = crypto.randomUUID();
}

function saveNote() {
    const title = titleInput.value.trim();
    const content = contentInput.value;

    setStatus("Đang lưu...");

    try {
        if (!hasSaved) {
            const note = AddNote(title, content);
            noteId = note.id;
            hasSaved = true;
        } else {
            EditNote(noteId, title, content);
        }

        setStatus("Đã lưu");
    } catch (error) {
        setStatus(error.message);
    }
}

function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        saveNote();
    }, 3000);
}

titleInput.addEventListener("input", scheduleSave);
contentInput.addEventListener("input", scheduleSave)