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
      const {rank, username, online, level, exp,map, gold,characters , currentCharacter, rollCalls} = action.payload
      state.rank = rank,
      state.username = username,
      state.online = online,
      state.level = level,
      state.exp = exp,
      state.map = map,
      state.gold = gold,
      state.characters = characters
      state.currentCharacter = currentCharacter
      state.rollCalls = rollCalls
      AsyncStorage.setItem('user', JSON.stringify(action.payload))
    },
    status: (state,action) => {
      console.log("set status", state);
      const {rank, username, online, level, exp,map, gold,characters , currentCharacter, rollCalls} = action.payload
      state.rank = rank,
      state.username = username,
      state.online = online,
      state.level = level,
      state.exp = exp,
      state.map = map,
      state.gold = gold,
      state.characters = characters
      state.currentCharacter = currentCharacter
      state.rollCalls = rollCalls
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
    },
    updateGoldReducer: (state, action) => {
      console.log("updateGoldReducer", action.payload);
      state.gold = action.payload
    },
    updateCharactersReducer: (state, action) => {
      const newCha = action.payload
      console.log("updateCharactersReducer", action.payload);
      if(state.characters) {
        state.characters.push(newCha)
      }
      else {
        state.characters = [newCha]
      }
    },
    updateUserCharacterReducer: (state, action) => {
      console.log("update User Character Reducer", action.payload);
      state.currentCharacter = action.payload
    },
    updateUserRollCallReducer : (state,action) => {
      console.log("update User Roll Call", action.payload);
      if(state.rollCalls) {
        state.rollCalls.push(action.payload)
      }
      else {
        state.rollCalls = [action.payload]
      }
    }
  },
});


export default slice.reducer
// Actions
const { loginSuccess, logoutSuccess,status ,updateGoldReducer,updateCharactersReducer,updateUserCharacterReducer,updateUserRollCallReducer} = slice.actions
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

export const updateGold =(gold) => async dispatch => {
  try {
    return dispatch(updateGoldReducer(gold))
  }
  catch (e) {
    return console.error(e.message);
  }
}


export const updateCharacters =(characters) => async dispatch => {
  try {
    return dispatch(updateCharactersReducer(characters))
  }
  catch (e) {
    return console.error(e.message);
  }
}

export const updateUserCharacters =(character) => async dispatch => {
  try {
    return dispatch(updateUserCharacterReducer(character))
  }
  catch (e) {
    return console.error(e.message);
  }
}
export const rollCall =(date) => async dispatch => {
  try {
    return dispatch(updateUserRollCallReducer(date))
  }
  catch (e) {
    return console.error(e.message);
  }
}