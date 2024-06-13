// Exporting the renderNotes function, which takes an array of note objects as input
export function renderNotes(notes) {

    // Using map to transform each note object into an HTML string
    let newNote = notes.map(({
        id,       // Destructuring to extract properties from each note object
        note,
        title,
        isPinned
    }) => {
        /*
         * Constructing the HTML structure for a single note using a template literal.
         * Each note is wrapped in a div with a class of 'single-note' and additional classes for styling.
         * The note's title is displayed inside a span, and there are buttons for deleting, pinning, and archiving the note.
         * The delete button is initially hidden and can be made visible via CSS.
         * The pin button changes its icon based on the isPinned status of the note.
         * Data attributes are added to buttons for identifying the action type and note ID, which helps in event handling.
         * Finally, the generated HTML string for the note is returned.
         */
        return `<div class="single-note relative shadow">
                    <!-- Title container with note title and delete button -->
                    <div class="d-flex align-center title-container">
                        <span class="single-note-title">${title}</span>
                        <!-- Delete button, initially hidden, with data attributes for type and id -->
                        <button class="button del-btn v-hidden" data-type="del" data-id="${id}">
                            <span data-type="del" data-id="${id}" class="material-icons-outlined">delete</span>
                        </button>
                    </div>
                    <!-- Note content -->
                    <p>${note}</p> 
                    <!-- Options container with buttons for pinning and archiving -->
                    <div class="options d-flex gap-md">
                        <!-- Pin button, initially hidden, with dynamic class based on isPinned status -->
                        <button class="button btn pinned-btn v-hidden" data-pinned=${isPinned} data-type="pinned" data-id="${id}">
                            <span class=${isPinned ? "material-icons" : "material-icons-outlined"} data-pinned=${isPinned} data-type="pinned" data-id="${id}">push_pin</span>
                        </button>
                        <!-- Archive button, initially hidden -->
                        <button class="button btn pinned-btn v-hidden" data-type="archived" data-id="${id}">
                            <span data-type="archived" data-id="${id}" class="material-icons-outlined">archive</span>
                        </button>
                    </div>   
                </div>`;
    });

    // Joining all the generated HTML strings into a single string
    newNote = newNote.join("");

    // Returning the final HTML string representing all notes
    return newNote;
};
