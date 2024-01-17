export interface IButtonOption {
    icon?: string;
    label?: string;
    customClass?: string;
    onSelect?: () => unknown
    options?: Array<IButtonOption>;
    opened?: boolean;
    selected?: boolean;
    _menuWidth?: number;
}