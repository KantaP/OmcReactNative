'use strict' 

import type { Action } from '../actions/types'
import { SET_USER_TOKEN } from '../actions/user'

export type State = {
    userState: Object
}

const initialState = {
    userState:{
        token: ''
    }
}

export default function (state:State = initialState , action:Action):State {
    if(action.type === SET_USER_TOKEN){
        return Object.assign(
            {}, 
            state, 
            { userState: Object.assign( 
                {}, 
                state.userState, 
                { token: action.token })
            })
    }else{
        return state
    }
}