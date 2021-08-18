// Declare initialState
const initialState = {
    isPlaying: false,
}
// Create action type 
const PLAY = 'PLAY';
const PAUSE = 'PAUSE';

//Make funtions for action 
export const play= () => ({
    type: PLAY
})

export const pause = () => ({
    type: PAUSE
});

export default function reducer(state = initialState, action){
    switch(action.type){
        case PLAY: 
            return {
                ...state,
                isPlaying: true    
            };
        case PAUSE:
            return {
                ...state,
                isPlaying: false
            };
        default:
            return state;
    }
}