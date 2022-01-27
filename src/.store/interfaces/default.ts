//------------------------Store------------------------
export interface StoreI {
  lastUpdateTimestamp: string;
}

//------------------------Actions------------------------
export interface ActionI {
  type: string;
  payload: string;
}
