import { useReducer } from 'react';

function reducer(state, action) {
    return state.map((res) => {
        if (res.name === action.name) {
            return {
                name: action.name,
                label: action.name,
                checked: action.checked
            }
        }
        return {
            ...res,
            checked : false,
        }
    })
}

export default function useRadio(initialForm) {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = e => {
        dispatch(e.target);
    };
    return [state, onChange];
}