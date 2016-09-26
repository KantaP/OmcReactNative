
'use strict';

export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'OPEN_MODAL'}
    | { type: 'CLOSE_MODAL'}
    | { type: 'CATEGORY_MODAL' , category: string}
    | { type: 'MAP_REGION' , region: Object}
    | { type: 'SET_USER_TOKEN' , token: string}
    | { type: 'LOADING' }
    | { type: 'SET_JOB_ID' , jobId: number}
    | { type: 'GET_MY_QUOTES' }
    | { type: 'GET_MY_QUOTES_DONE' }
    | { type: 'SET_QUOTE_FORM_PART_1' , data:Object}
    | { type: 'SET_QUOTE_FORM_PART_2' , data:Object}
    | { type: 'JOB_CREATING'}
    | { type: 'JOB_CREATED'}
    | { type: 'FETCH_MORE_MY_QUOTES'}
    | { type: 'FETCH_MY_QUOTES_REQUEST'}
    | { type: 'FETCH_MY_QUOTES_ERROR'}
    | { type: 'FETCH_MY_QUOTES_SUCCESS'}
    | { type: 'FETCH_MY_BOOKING_REQUEST'}
    | { type: 'FETCH_MY_BOOKING_ERROR'}
    | { type: 'FETCH_MY_BOOKING_SUCCESS'}

export type Dispatch = (action:Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch:Dispatch, getState:GetState) => any;
export type PromiseAction = Promise<Action>;
