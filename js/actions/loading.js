'use strict'

import type { Action } from './types'

export const LOADING = 'LOADING'
export const LOADED = 'LOADED'

export function loading():Action {
    return {
        type: LOADING
    }
}

export function loaded():Action {
    return {
        type: LOADED
    }
}