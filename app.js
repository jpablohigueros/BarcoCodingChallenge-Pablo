const app = Vue.createApp({
    data() {
        return {
            urlPrefix: 'https://jsonplaceholder.typicode.com/users',
            users: null,
            person: null,
            todos: null,
            showPerson: false // Flag that determines whether to show the list of users or their to do's
        }
    },
    methods: {
        fetchUsers() { // Function gets user data from api
            try {
                fetch(this.urlPrefix)
                    .then(response => response.json()) // Parse json
                    .then(json => this.setUsers(json)) // Set users variable in data()
            } catch (e) {
                console.error(e)
            }
        },
        setUsers(users) { // Function gets data from fetchUsers() and sets it up to be returned in data()
            this.users = users
        },
        setPerson(event) { // Function selects the user that was selected
            let id = parseInt(event.target.id) // Make sure id comes as int
            let size = this.users.length
            for (let i = 0; i < size; i++) { // Get the user for the selected id
                if (this.users[i].id === id) {
                    this.person = this.users[i]
                    this.getPersonTodos()
                }
            }
        },
        getPersonTodos() { // Fetches selected user's tasks from api
            try {
                fetch(this.urlPrefix + '/' + this.person.id + '/todos')
                    .then((response) => response.json()) // Parse json
                    .then((json) => this.setTodos(json)) // Set users variable in data()
                    .then(() => this.changePage()) // We are using conditional rendering (not separate pages). This function
                                                   // switches the flag that signals we need to render the to dos page
            } catch (e) {
                console.error(e)
            }
        },
        setTodos(todos) { // Helper to set todos
            this.todos = todos
        },
        changePage() { // Determines which page is being shown (switches between main page and user page)
            if(!this.showPerson) {
                this.showPerson = true
            }
            else {
                this.showPerson = false
            }
        },
        calculatePercentage() { // Calculates percentage of tasks completed
            let total = this.todos.length
            let done = 0
            for (let i = 0; i < total; i ++) { // Adds up all completed tasks
                if (this.todos[i].completed) {
                    done++
                }
            }
            let percent = Math.round((done / total) * 100)
            this.setProgressBar(percent)
            return percent
        },
        setProgressBar(progress) { // Sets width of progress bar
            setTimeout(function () { // Timeout allows element to load before we try to extract it
                let element = document.getElementById("dynamic")
                element.style.width = progress + "%"
                console.log(element)
            }, 10)
        }
    },
    created(){
        // These will run when page loads
        this.fetchUsers()
    }
}).mount('#app')