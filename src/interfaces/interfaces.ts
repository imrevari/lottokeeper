import { Dispatch, SetStateAction } from "react";
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

export interface Result {
  totalTickets: number;
  totalIncome: number;
  totalWonAmount: number;
  totalProfit: number;
  winnersOf2: number;
  winnersOf3: number;
  winnersOf4: number; 
  winnersOf5: number;
}

export interface StateContextType {
    purchaseTicket: (amount: number, newTicket: LotteryTicket) => void;
    winLottary: (amount: number) => void;
    changeName: (newName: string, forPlayer: boolean) => void;
    draw: (newDraw: Draw) => void;
    resetRound: () => void;
    resetGame: () => void;
    lotteryLoses: (amount: number) => void;
    updateDrawnTickets: (tickets: LotteryTicket[]) => void;
    player: User;
    admin: User;
    lotteryTickets: LotteryTicket[];
    draws: Draw[];
  }

export interface PopupWindowProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export type Action =
| {
  type: Actions.RESET_GAME | Actions.RESET_ROUND;
}
| {
  type: Actions.UPDATE_DRAWN_TICKETS;
  payload: {
    updatedTickets: LotteryTicket[];
  };
} 
| {
  type: Actions.DRAW;
  payload: {
    newDraw: Draw;
  };
}
| {
    type: Actions.PLAYER_WINS | Actions.ADMIN_LOSES;
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