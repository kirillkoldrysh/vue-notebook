// New Vue.js instance
new Vue({
    el: '#notebook',

    // Some data
    data() {
        return {
            content: localStorage.getItem('content') || 'You can write in **markdown**',
            notes: [],
        }
    },

    // Computed properties
    computed: {
        notePreview() {
            // Markdown rendered to HTML
            return marked(this.content);
        },
        addButtonTitle() {
            return this.notes.length + ' note(s) already';
        }
    },

    methods: {
        saveNote() {
            console.log('saving note: ', this.content);
            localStorage.setItem('content', this.content);
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
                content: '**Hi** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false,
            };

            // Add to the list
            this.notes.push(note);
        }
    },

    // Change watchers
    watch: {
        // Watching 'content' data property
        content: 'saveNote',
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