import { createAction, createReducer } from '@reduxjs/toolkit'
import  { createLockPassword } from './actions'

const userReducer = createReducer(0, (builder) => {
  builder.addCase(createLockPassword, (state, action) => {
    return state + action.payload;
  })
})

export default userReducer;