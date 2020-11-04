import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createScreen } from './actions'

export function getScreen(screen){
  // console.log("screen", screen);
  // const dispatch = useDispatch();
  // const l = useSelector(state => state.screens[screen]);
  // console.log("l", l);
  return screen ? useSelector(state => state.screens[screen]) : null
}

export function setScreen(screen){
  const keys = Object.keys(screen);
  // console.log("keys", keys);
  const dispatch = useDispatch();
  return useCallback((screen) => {
    dispatch(createScreen(screen));
  }, [dispatch, ...keys])
}


