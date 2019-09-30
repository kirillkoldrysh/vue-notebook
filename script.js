Vue.filter('date', time => new moment(time)
    .format('DD/MM/YY, HH:mm'));

// New Vue.js instance
new Vue({
    el: '#notebook',
    name: 'notebook',

    // Some data
    data() {
        return {
            // content: localStorage.getItem('content') || 'You can write in **markdown**',
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null,
        }
    },

    // Computed properties
    computed: {
        notePreview() {
            if(this.selectedId !== null)
                // Markdown rendered to HTML
                return this.selectedNote ? marked(this.selectedNote.content) : '';
        },
        addButtonTitle() {
            return this.notes.length + ' note(s) already';
        },
        selectedNote() {
            if(this.selectedId !== null)
                // We return the matching note with selectedId
                return this.notes.find(note => note.id === this.selectedId);
            else
                return {content: this.content};
        },
        sortedNotes() {
            return this.notes.slice()
                .sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite) ? 0
                    : a.favorite ? -1 
                    : 1);
        },
        linesCount() {
            if (this.selectedNote) {
                // Count the number of new line characters
                return this.selectedNote.content.split(/\r\n|\r|\n/).length;
            }
        },
        wordsCount() {
            if (this.selectedNote) {
                var s = this.selectedNote.content;
                // Turn new line characters into white-spaces
                s = s.replace(/\n/g, ' ');
                // Exclude start and end white-spaces
                s = s.replace(/(^\s*)|(\s*$)/gi, '');
                // Turn 2 or more duplicate white-spaces into 1
                s = s.replace(/\s\s+/gi, ' ');
                // Return the number of spaces
                return s.split(' ').length;
            }
        },
        charactersCount() {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length;
            }
        }
    },

    methods: {
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
            this.reportOperation('saving');
        },
        reportOperation(opName) {
            console.log('The ', opName, ' operation was completed!');
        },
        addNote() {
            const time = Date.now();
            // Default new note
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: '**Hi!** This notebook is using markdown for formatting',
                created: time,
                favorite: false,
            };

            // Add to the list
            this.notes.push(note);
            // Select
            this.selectNote(note);
        },
        selectNote(note) {
            this.selectedId = note.id;
        },
        removeNote() {
            if (this.selectedNote && confirm('Delete the note?')) {
                // Remove the note in the notes array
                const index = this.notes.indexOf(this.selectedNote);
                if (index !== -1) {
                    this.notes.splice(index, 1);
                    this.selectedId = "";
                }
            }
        },
        favoriteNote() {
            this.selectedNote.favorite = !this.selectedNote.favorite;
            // same as
            // this.selectedNote.favorite ^= true;
        }
    },

    // Change watchers
    watch: {
        // When our notes change, we save them
        notes: {
            handler: 'saveNotes',
            deep: true,
        },

        selectedId(val) {
            localStorage.setItem('selected-id', val);
        },

        // Watching 'content' data property
        // content: 'saveNote',
    },

    // This will be called when the instance is ready
    // created () {
    //     // Set the content to the stored value
    //     // or to a default string if nothing was saved
    //     this.content = localStorage.getItem('content') || 'You can write in **markdown**';   
    // },
});


// console.log('restored note: ', localStorage.getItem('content'));

// Marked library test
// const html = marked('**Bold** *Italic* [link](http://hello.vue.org/)');
// console.log(html);