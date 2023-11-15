import { Actions, UserType } from "./enums";

export interface User {
    userType: UserType;
    userName: string;
    balance: number;
}

export interface LotteryTicket {
  user: User;
  purchased: Date;
  selectedNumbers: number[];
  drawConducted: boolean;
  winningNumbers?: number[];
  amountWon?: number;
}

export interface Draw {
  conductedOn: Date;
  selectedNumbers: number[];
}

export interface State {
    player: User;
    admin: User;
    lotteryTickets: LotteryTicket[];
    draws: Draw[];
}

export interface StateContextType {
    purchaseTicket: (amount: number, newTicket: LotteryTicket) => void;
    winLottary: (amount: number) => void;
    changeName: (newName: string, forPlayer: boolean) => void;
    draw: (newDraw: Draw) => void;
    player: User;
    admin: User;
    lotteryTickets: LotteryTicket[];
    draws: Draw[];
  }

export type Action =
| {
  type: Actions.DRAW;
  payload: {
    newDraw: Draw;
  };
}
| {
    type: Actions.PLAYER_WINS;
    payload: {
      amount: number;
    };
  }
| {
    type: Actions.PURCHASE_TICKET;
    payload: {
      amount: number;
      newTicket: LotteryTicket;
    };
  }
| {
    type: Actions.CHANGE_PLAYER_NAME | Actions.CHANGE_ADMIN_NAME;
    payload: {
      newName: string;
    };
  };