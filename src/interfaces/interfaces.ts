import { Actions, UserType } from "./enums";

export interface User {
    userType: UserType;
    userName: String;
    balance: number;
}


export interface State {
    player: User;
    admin: User;

}

export interface StateContextType {
    purchaseTicket: (amount: number) => void;
    winLottary: (amount: number) => void;
    chaneName: (ewName: string, forPlayer: boolean) => void;
    player: User;
    admin: User;
  }

export type Action =
| {
    type: Actions.PLAYER_WINS | Actions.PURCHASE_TICKET;
    payload: {
      amount: number;
    };
  }
| {
    type: Actions.CHANGE_PLAYER_NAME | Actions.CHANGE_ADMIN_NAME;
    payload: {
      newName: string;
    };
  };