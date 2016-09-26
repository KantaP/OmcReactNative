'use strict' 

import type { ACTION } from './types'

export const MAP_REGION = 'MAP_REGION'

export function mapRegion(region:Object):Action {
    return {
        type: MAP_REGION,
        region
    }
}