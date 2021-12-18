const app = Vue.createApp({
    data() {
        return {
            urlPrefix: 'https://jsonplaceholder.typicode.com/',
            users: null,
            person: null,
            todos: null,
            showPerson: false
        }
    },
    methods: {
        fetchUsers() { // Function gets user data from api
            fetch(this.urlPrefix + 'users')
                .then(response => response.json())
                .then(json => this.setUsers(json))
        },
        setUsers(users) { // Function gets data from fetchUsers() and sets it up to be returned in data()
            this.users = users
        },
        setPerson(event) { // Function selects the user that was selected
            let id = parseInt(event.target.id)
            let size = this.users.length
            for (let i = 0; i < size; i++) {
                if (this.users[i].id === id) {
                    this.person = this.users[i]
                    this.getPersonTodos()
                }
            }
        },
        getPersonTodos() { // Fetches selected user's tasks from api
            fetch(this.urlPrefix + 'users/' + this.person.id + '/todos')
                .then((response) => response.json())
                .then((json) => this.setTodos(json))
                .then(() => this.changePage())
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
        calculatePercentage() {
            let total = this.todos.length
            let done = 0
            for (let i = 0; i < total; i ++) {
                if (this.todos[i].completed) {
                    done++
                }
            }
            let percent = Math.round((done / total) * 100)
            this.setProgressBar(percent)
            return percent
        },
        setProgressBar(progress) {
            setTimeout(function () {
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