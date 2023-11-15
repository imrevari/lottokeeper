import { Actions, UserType } from "./enums";

export interface User {
    id?: number;
    userType: UserType;
    userName: string;
    balance: number;
}

export interface LotteryTicket {
  user: User,
  purchased: Date,
  selectedNumbers: number[],
  drawConducted: boolean
}

export interface Draw {
  conductedOn: Date,
  selectedNumbers: number[]
}

export interface State {
    player: User;
    admin: User;
    lotteryTickets: LotteryTicket[],
    draws: Draw[]
}

export interface StateContextType {
    purchaseTicket: (amount: number) => void;
    winLottary: (amount: number) => void;
    changeName: (newName: string, forPlayer: boolean) => void;
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