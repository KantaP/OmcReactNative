'use strict' 

import type { ACTION } from './types'

export const SET_USER_TOKEN = 'SET_USER_TOKEN'

export function setUserToken(token:string):Action {
    return {
        type: SET_USER_TOKEN,
        token
    }
}