import { GetNoteById, AddNote, EditNote } from "./storage.js"

const params = new URLSearchParams(window.location.search);
const existingNoteId = params.get("id");

const titleInput = document.querySelector("#note-title");
const contentInput = document.querySelector("#note-content");
const saveStatus = document.querySelector("#save-status");
const backButton = document.querySelector(".header a");

let noteId = existingNoteId;
let saveTimer = null;
let hasSaved = Boolean(existingNoteId);

function setStatus(text) {
    if (saveStatus) {
        saveStatus.textContent = text;
    }
}

if (existingNoteId) {
    const note = GetNoteById(existingNoteId);

    if (note) {
        titleInput.value = note.title;
        contentInput.value = note.content;
    } else {
        hasSaved = false;
        noteId = crypto.randomUUID();
    }
} else {
    noteId = crypto.randomUUID();
}

function saveNote() {
    const title = titleInput.value.trim();
    const content = contentInput.value;

    if (!hasSaved && !title && !content.trim()) {
        return;
    }

    if (!title) {
        setStatus("Tiêu đề không được trống");
        return;
    }

    setStatus("Đang lưu...");

    try {
        if (!hasSaved) {
            const note = AddNote(title, content);
            noteId = note.id;
            hasSaved = true;
            window.history.replaceState(null, "", `?id=${encodeURIComponent(note.id)}`);
        } else {
            EditNote(noteId, title, content);
        }

        setStatus("Đã lưu");
    } catch (error) {
        setStatus(error.message);
    }
}

function scheduleSave() {
    setStatus("Đang lưu...");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        saveNote();
    }, 1000);
}

titleInput.addEventListener("input", scheduleSave);
contentInput.addEventListener("input", scheduleSave);

titleInput.addEventListener("blur", () => {
    clearTimeout(saveTimer);
    saveNote();
});

contentInput.addEventListener("blur", () => {
    clearTimeout(saveTimer);
    saveNote();
});

if (backButton) {
    backButton.addEventListener("click", () => {
        clearTimeout(saveTimer);
        saveNote();
    });
}