'use strict'

import type { Action } from '../actions/types'
import { LOADING  , LOADED } from '../actions/loading'

export type State = {
    loadingState: Boolean
}

const initialState = {
    loadingState : false
}

export default function (state:State = initialState, action:Action):State {
    if(action.type === LOADING){
        return Object.assign( {} , state , {loadingState: true}) 
    }else if(action.type === LOADED){
        return Object.assign( {} , state , {loadingState: false}) 
    }else {
        return state
    }
}