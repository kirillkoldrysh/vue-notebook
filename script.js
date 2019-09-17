// New Vue.js instance
new Vue({
    el: '#notebook',

    // Some data
    data() {
        return {
            content: localStorage.getItem('content') || 'You can write in **markdown**',
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