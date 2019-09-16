// New Vue.js instance
new Vue({
    el: '#notebook',

    // Some data
    data() {
        return {
            content: 'This is not a note.',
        }
    },

    // Computed properties
    computed: {
        notePreview() {
            // Markdown rendered to HTML
            return marked(this.content);
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
    },

    // Change watchers
    watch: {
        // Watching 'content' data property
        content: 'saveNote',
    },

});

// Marked library test
// const html = marked('**Bold** *Italic* [link](http://hello.vue.org/)');
// console.log(html);