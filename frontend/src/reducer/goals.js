const initialState = {
    goals: [],
}

export default function goalsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_GOALS':
            return { ...state, goals: action.payload };
        default:
            return state;
    }
}