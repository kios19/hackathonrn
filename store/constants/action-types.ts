import { Action } from 'redux';

export const ADD_LOGIN = "ADD_LOGIN";
export const ADD_PAGEDATA = "ADD_PAGEDATA";


export interface AddActions  extends Action{
    type:
        | typeof ADD_LOGIN
        | typeof ADD_PAGEDATA
    payload: string | boolean;
}


export type ActionTypes = AddActions;