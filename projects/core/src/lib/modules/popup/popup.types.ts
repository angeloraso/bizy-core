export interface IBizyPopupResponse {
    id: string;
    response: unknown;
}

export enum POPUP_PLACEMENT {
    TOP = 'TOP',
    RIGHT = 'RIGHT',
    BOTTOM = 'BOTTOM',
    LEFT = 'LEFT'
}