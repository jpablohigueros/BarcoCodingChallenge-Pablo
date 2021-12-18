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
        setPerson(event) {
            let id = parseInt(event.target.id)
            let size = this.users.length
            for (let i = 0; i < size; i++) {
                if (this.users[i].id === id) {
                    this.person = this.users[i]
                    this.getPersonTodos()
                }
            }
        },
        getPersonTodos() {
            fetch(this.urlPrefix + 'users/' + this.person.id + '/todos')
                .then((response) => response.json())
                .then((json) => this.setTodos(json));
            this.showPerson = true
        },
        setTodos(todos) {
            this.todos = todos
        }
    },
    created(){
        // These will run when page loads
        this.fetchUsers()
    }
}).mount('#app')