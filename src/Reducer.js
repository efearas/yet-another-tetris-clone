const reducer = (state, action) => {
    let newState = {};
    switch (action.type) {
        case 'COLLAPSE_ANIMATION':
            newState = {
                ...state,
                indexOfRowsToCollapse: action.payload.indexOfRowsToCollapse,
            }
            return newState;
        case 'INCREASE_SCORE':
            newState = {
                ...state,
                score: state.score + action.payload.increment,
            }
            return newState;
        default:
            return state;

    };
}

export default reducer