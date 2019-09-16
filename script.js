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

});

// Marked library test
const html = marked('**Bold** *Italic* [link](http://hello.vue.org/)');
console.log(html);