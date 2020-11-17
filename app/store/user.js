import { createSlice } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

// Slice
const slice = createSlice({
  name: 'user',
  initialState:  {
    username: null
  } ,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("=====login sucessful!======", action.payload)
      state.user = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(action.payload))
    },
    status: (state,action) => {
      console.log("set status", state);
      const {rank, username, online, level, exp,map} = action.payload
      state.rank = rank,
      state.username = username,
      state.online = online,
      state.level = level,
      state.exp = exp,
      state.map = map
    },
    logoutSuccess: (state, action) =>  {
      console.log("logoutSuccess")
      state.user = null;
      auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out successful.");
      }).catch(function(error) {
        console.log("Sign-out error.");
        // An error happened.
      });
      AsyncStorage.removeItem('user')
    },
    setUser: (state) => {
      if (auth().currentUser) {
        userId = auth().currentUser.uid;
        if (userId) {
            database()
            .ref('users/' + userId)
            .once('value')
            .then(snapshot => {
              console.log("status user---------->", snapshot.val());
              state.user = snapshot.val()
              console.log("state.uset", state.user);
            });
        }
      }
    }
  },
});


export default slice.reducer
// Actions
const { loginSuccess, logoutSuccess,status } = slice.actions
export const login = ( user ) => async dispatch => {
  try {
    return dispatch(loginSuccess(user))
    // dispatch(loginSuccess({username}));
  } catch (e) {
    return console.error(e.message);
  }
}
export const logout = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}

export const setStatus =(stt)=> async dispatch => {
  try {
    return dispatch(status(stt))
  } catch (e) {
    return console.error(e.message);
  }
}