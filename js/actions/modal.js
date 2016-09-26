'use stict'

import type { ACTION } from './types'

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CATEGORY_MODAL = 'CATEGORY_MODAL'

export function openModal():Action {
    return {
        type: OPEN_MODAL
    }
}

export function closeModal():Action {
    return {
        type: CLOSE_MODAL
    }
}

export function categoryModal(category:string):Action {
    return {
        type: CATEGORY_MODAL,
        category
    }
}