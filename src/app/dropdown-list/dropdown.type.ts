
export interface SingleDropDownOption {
    name: string;
    isSelected: boolean;
    value?: any;
    hidden?: boolean;
    hasDifferentCurrency?: boolean;
}

export interface GroupedDropDownOption {
    groupName: string;
    groupIsOpen: boolean;
    singleOptions: SingleDropDownOption[];
    hidden?: boolean;
}

export type DropdownDirection = "UP" | "DOWN";
