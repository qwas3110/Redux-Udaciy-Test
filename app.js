// App Code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
//随机获取一个id
function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}


function createStore (reduce) {

    let state;

    let listeners = [];


    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners.filter(l => l !==listener);
        }
    };

    const dispatch = (action) => {
        state = reduce(state, action);
        listeners.forEach(l => l());
    };

    return {
        getState,
        subscribe,
        dispatch
    }
}



function todos (state = [], action ) {
    switch (action.type) {
        case ADD_TODO :
            return state.concat([action.todo]);
        case REMOVE_TODO :
            return state.filter(t => t.id !== action.id);
        case TOGGLE_TODO :
            return state.map(t => t.id !== action.id ? t :
                Object.assign({}, t, {complete: !t.complete}));
        default :
            return state;
    }
}


function goals (state = [], action ) {
    switch (action.type) {
        case ADD_GOAL :
            return state.concat([action.goal]);
        case REMOVE_GOAL :
            return state.filter(g => g.id !== action.id);
        default :
            return state;
    }
}



function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}



const addTodoAction = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
};


const removeTodoAction = (id) => {
    return {
        type: REMOVE_TODO,
        id
    }
};



const toggleTodoAction = (id) => {
    return {
        type: TOGGLE_TODO,
        id
    }
};


const addGoalAction = (goal) => {
    return {
        type: ADD_GOAL,
        goal
    }
};


const removeGoalAction = (id) => {
    return {
        type: REMOVE_GOAL,
        id
    }
};


const store = createStore(app);


store.subscribe(() => {

    const { todos, goals } = store.getState();

    document.getElementById('todos').innerHTML = '';
    document.getElementById('goals').innerHTML = '';


    todos.forEach(addTodoToDOM);
    goals.forEach(addGoalsToDOM);

});


function addTodo () {
    const input = document.getElementById('todo');
    const name = input.value;


    input.vlaue = '';

    store.dispatch(addTodoAction({
        name,
        id:generateId(),
        complete: false
    }))
}

function addGoal ( ) {
    const input = document.getElementById('goal');
    const name = input.value;

    input.value = '';

    store.dispatch(addGoalAction({
        name,
        id: generateId()
    }))
}


document
    .getElementById('todoBtn')
    .addEventListener('click', addTodo);


document
    .getElementById('goalBtn')
    .addEventListener('click', addGoal);



function removeButton (onClick) {
    const button = document.createElement('button');
    button.innerHTML = 'X';

    button.addEventListener('click', onClick);
    return button;
}


function addTodoToDOM (todo) {
    const node = document.createElement('li');
    const text = document.createTextNode(todo.name);
    const button = removeButton(() => {
        store.dispatch(removeTodoAction(todo.id))
    });

    node.appendChild(text);
    node.appendChild(button);

    node.style.textDecoration = todo.complete ? 'line-through' : 'none';
    node.addEventListener('click', () => {
        store.dispatch(toggleTodoAction(todo.id))
    });


    document.getElementById('todos')
            .append(node);
}


function addGoalsToDOM (goal) {
    const node = document.createElement('li');
    const text = document.createTextNode(goal.name);
    const button = removeButton(() => {
        store.dispatch(removeGoalAction(goal.id))
    });

    node.appendChild(text);
    node.appendChild(button);



    document.getElementById('goals')
            .append(node);
}










