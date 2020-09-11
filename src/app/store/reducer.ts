import {UserActions, UserActionTypes} from './actions';
import {IUser} from '../_interface/iuser';

export interface IUserState {
  data: IUser[];
  isLoading: boolean;
  message: string;
}

const initialState: IUserState = {
  data: [],
  isLoading: false,
  message: ''
};

export function reducer(state = initialState, action: UserActions): IUserState {

  switch (action.type) {
    case UserActionTypes.GetUserLoad: {
      return {
        ...state,
        isLoading: true
      };
    }

    case UserActionTypes.GetUserSuccess: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        message: 'Data fetch Successfully!'
      };
    }
    case UserActionTypes.GetUserFail: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong!'
      };
    }
    case UserActionTypes.PostUser: {
      return {
        ...state,
        isLoading: true
      };
    }

    case UserActionTypes.PostUserSuccess: {
      const updatedData = [...state['data']];
      updatedData.push(action.payload);
      return {
        ...state,
        data: updatedData,
        isLoading: false,
        message: 'Data posted Successfully!'
      };
    }
    case UserActionTypes.PostUserFail: {
      return {
        data: [],
        isLoading: false,
        message: 'Something went wrong!'
      };
    }
    default:
      return state;
  }
}
