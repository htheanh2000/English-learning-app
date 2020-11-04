import { createReducer } from '@reduxjs/toolkit'
import  { createScreen } from './actions'

const initialState = {
  //Main: {}
}

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createScreen, (state, action) => {

      console.log("action.payload->", action.payload);
      console.log("state->", state);
      const { name, close, data } = action.payload; 
      // console.log("name", name);
      // if(close && state[close]){
      //   console.log("action.payload.close", close);
      //   console.log("state[close]", state[close]);
      //   delete state[close]; 
      // }
      return {
        ...state,
        currentScreen: name,
      }
    })
})

export default userReducer;