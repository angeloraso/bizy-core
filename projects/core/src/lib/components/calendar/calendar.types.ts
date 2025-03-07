export enum BIZY_CALENDAR_MODE {
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day'
}

export enum BIZY_CALENDAR_DAY {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}

export enum BIZY_CALENDAR_EVENT_ACTION {
  DELETE = 'DELETE'
}


export interface IBizyCalendarEvent {
  start: number;
  end: number;
  description?: string;
  id?: number | string;
  color?: string;
  backgroundColor?: string;
  customClass?: string;
  meta?: Record<string, unknown>;
  actions?: Array<BIZY_CALENDAR_EVENT_ACTION>;
}

export enum BIZY_CALENDAR_LANGUAGE {
  SPANISH = 'es',
  ENGLISH = 'en'
}