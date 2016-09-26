'use strict'

import type {Action} from '../actions/types'
import { OPEN_MODAL, CLOSE_MODAL , CATEGORY_MODAL } from '../actions/modal'

export type State = {
    modalState: Object
}

const initialState = {
    modalState: {
        status: false,
        category: 'none'
    }
}

export default function (state:State = initialState , action:Action): State {
    if(action.type === OPEN_MODAL) {
        return Object.assign( {}, state, { modalState: Object.assign( {}, state.modalState, { status: true })})
    }else if(action.type === CLOSE_MODAL) {
        return Object.assign( {}, state, { modalState: Object.assign( {}, state.modalState, { status: false })})
    }else if(action.type === CATEGORY_MODAL) {
        return Object.assign( {}, state, { modalState: Object.assign( {}, state.modalState, { category: action.category })})
    }else{
        return state
    }
}