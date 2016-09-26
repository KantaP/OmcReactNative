'use strict'

import type { Action } from './types'

export const SET_JOB_ID = 'SET_JOB_ID'
export const FETCH_MY_QUOTES_REQUEST = 'FETCH_MY_QUOTES_REQUEST'
export const FETCH_MY_QUOTES_ERROR = 'FETCH_MY_QUOTES_ERROR'
export const FETCH_MY_QUOTES_SUCCESS = 'FETCH_MY_QUOTES_SUCCESS'
export const FETCH_MY_BOOKING_REQUEST = 'FETCH_MY_BOOKING_REQUEST'
export const FETCH_MY_BOOKING_ERROR = 'FETCH_MY_BOOKING_ERROR'
export const FETCH_MY_BOOKING_SUCCESS = 'FETCH_MY_BOOKING_SUCCESS'
export const SET_QUOTE_FORM_PART_1 = 'SET_QUOTE_FORM_PART_1'
export const SET_QUOTE_FORM_PART_2 = 'SET_QUOTE_FORM_PART_2'
export const JOB_CREATING = 'JOB_CREATING'
export const JOB_CREATED = 'JOB_CREATED'
export const FETCH_MORE_MY_QUOTES = 'FETCH_MORE_MY_QUOTES'

export function setJobId(jobId:number):Action{
    return {
        type: SET_JOB_ID,
        jobId
    }
}

export function fetchMyQuotesRequest():Action{
    return {
        type: FETCH_MY_QUOTES_REQUEST
    }
}

export function fetchMyQuotesError(error:Object):Action{
    return {
        type: FETCH_MY_QUOTES_ERROR,
        error
    }
}

export function fetchMyQuotesSuccess(data:Object):Action{
    return {
        type: FETCH_MY_QUOTES_SUCCESS,
        data
    }
}

export function fetchMyBookingRequest():Action{
    return {
        type: FETCH_MY_BOOKING_REQUEST
    }
}

export function fetchMyBookingError(error:Object):Action{
    return {
        type: FETCH_MY_BOOKING_ERROR,
        error
    }
}

export function fetchMyBookingSuccess(data:Object):Action{
    return {
        type: FETCH_MY_BOOKING_SUCCESS,
        data
    }
}

export function setQuoteFormPartOne(data:Object):Action{
    return {
        type: SET_QUOTE_FORM_PART_1,
        data
    }
}

export function setQuoteFormPartTwo(data:Object):Action{
    return {
        type: SET_QUOTE_FORM_PART_2,
        data
    }
}

export function jobCreating():Action{
    return {
        type: JOB_CREATING
    }
}

export function jobCreated():Action {
    return {
        type: JOB_CREATED
    }
}

export function getMoreMyQuotes():Action {
    return {
        type: FETCH_MORE_MY_QUOTES
    }
}