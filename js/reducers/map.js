'use strict'

import type { Action } from '../actions/types'
import { MAP_REGION } from '../actions/map'

export type State = {
    mapState: Object
}

const initialState = {
    mapState: {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    }
}

export default function (state:State = initialState , action:Action): State {
    if(action.type === MAP_REGION){
        return Object.assign( 
            {}, 
            state, 
            { mapState: Object.assign( 
                {}, 
                state.mapState, 
                { region: {...action.region} })
            })
    }else{
        return state
    } 
}