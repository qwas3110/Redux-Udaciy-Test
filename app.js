// // Action Creators in ES5
// function handleInitialData() {
//     return dispatch => {
//         return Promise.all([API.fetchTodos(), API.fetchGoals()])
//             .then(([todos, goals]) => {
//                 dispatch(receiveDataAction(todos, goals));
//             })
//             .catch(err => console.log(err));
//     };
// }
//
// // Component UI
// class App extends React.Component {
//     componentDidMount() {
//         const { store } = this.props;
//
//         store.dispatch(handleInitialData());
//
//         store.subscribe(() => this.forceUpdate());
//     }



