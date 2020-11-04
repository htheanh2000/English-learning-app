import { createAction } from '@reduxjs/toolkit'


export const createUser = createAction('user/create');
export const createLockPassword = createAction('user/createLockPassword');