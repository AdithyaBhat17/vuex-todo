let state = {
    todos: [
        {
            id: 0,
            task: "Buy food at the supermarket.",
            completed: true
        },
        {
            id: 1,
            task: "Buy a new phone.",
            completed: false
        }
    ]
}

let getters = {
    getTodos: state => state.todos
}

let mutations = {
    ADD_TODO: (state, payload) => {
        let newTask = {
            id: payload.newId,
            task: payload.task,
            completed: false
        }

        state.todos.unshift(newTask)
    },
    TOGGLE_TODO: (state, payload) => {
        let todo = state.todos.find(todo => todo.id === payload)

        todo.completed = !todo.completed
    },
    DELETE_TODO: (state, payload) => {
        let index = state.todos.findIndex(todo => todo.id === payload)
        
        state.todos.splice(index, 1)
    }
}

let actions = {
    addTodo: (context, payload) => {
        context.commit("ADD_TODO", payload)
    },
    toggleTodo: (context, payload) => {
        context.commit("TOGGLE_TODO", payload)
    },
    deleteTodo: (context, payload) => {
        context.commit("DELETE_TODO", payload)
    }
}

let store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

// todo list component
Vue.component("todo-list", {
    props: ["todos"],
    methods: {
        toggleTodo: function(id) {
            this.$store.dispatch("toggleTodo", id)
        },
        deleteTodo: function(id) {
            this.$store.dispatch("deleteTodo", id)
        }
    },
    template: '#todo-list'
}) 

// parent component for the app
let app = new Vue({
    data: () => ({
        task: '',
        newId: null
    }),
    computed: {
        todos() {
            this.newId = this.$store.getters.getTodos.length
            return this.$store.getters.getTodos
        }
    },
    methods: {
        addTodo: function() {
            this.$store.dispatch("addTodo", this)
            this.newId ++
            this.task = ''
        }
    },
    store,
    el: '#app',
    template: '#app-template'
})

