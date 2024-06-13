import { renderNotes } from "./app.js"


let note = document.querySelector(".note");
let title = document.querySelector(".title");
let addNoteButton = document.querySelector(".add-btn");
let noteDisplay = document.querySelector(".notes-display");
let showOtherNotes = document.querySelector(".notes-container");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");

if (arrayOfNotes.length > 0){
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
}


addNoteButton.addEventListener("click", function(){
	// console.log(note.value);
	// console.log(title.value);

	// checking if the value of note and title is blank or not 
	if (note.value.trim().length>0 || title.value.trim().length>0){
		// creating a array to store all the values 
		// id, note, title, isPinned, isArchived
		arrayOfNotes = [...arrayOfNotes,{
			id: Date.now(),
			title: title.value.trim(),
			note:note.value.trim(), 
			isPinned: false, 
			isArchived: false}];
	}
	console.log(arrayOfNotes);
	// to make sure, eveytime , + button is presed the text on it gets deleted 
	// so that new note can be ordered by the user
	note.value = title.value = "";
	// this is helping to make sure content is displayed on the web page
	showOtherNotes.innerHTML =  renderNotes(arrayOfNotes);
	// to save the data on local storage
	// we will convert to string as we have array as the resultant value
	localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
});

showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
    isPinned, isArchived
}) => !isPinned && !isArchived));


// deletion, pushpin and archive

noteDisplay.addEventListener("click", (event) => {
    let noteId = event.target.dataset.id;
    let type = event.target.dataset.type;
    switch (type) {
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({
                id
            }) => id.toString() !== noteId);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned, isArchived
            }) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned
            }) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "pinned":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {
                ...note,
                isPinned: !note.isPinned
            } : note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned, isArchived
            }) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned
            }) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "archived":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {
                ...note,
                isArchived: !note.isArchived
            } : note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned, isArchived
            }) => !isPinned && !isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        default:
            console.log("none");
    }
})

showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
    isPinned
}) => isPinned));
