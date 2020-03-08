import { ActionType, StateType } from "typesafe-actions";

declare module "typesafe-actions" {
  export type Store = StateType<typeof import("./index").default>;
  export type RootAction = ActionType<typeof import("./RootAction").default>;
  export type RootState = StateType<ReturnType<typeof import("./RootReducer").default>>;

  interface Types {
    RootAction: RootAction;
  }
}
