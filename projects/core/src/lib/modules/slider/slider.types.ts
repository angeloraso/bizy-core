export type SliderBullet = 'value' | 'min' | 'max';
export type SliderBulletEvent = number | { bullet: 'min' | 'max'; value: number };
export type SliderRange = { min: number; max: number };
export type SliderLimit = { min?: number; max?: number };
