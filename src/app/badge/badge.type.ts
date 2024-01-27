export interface IBadgeDropDownContentItem {
    text?: string;
    active?: boolean;
    icon?: string;
    link?: string;
}

export class BadgeDropDownContentItem implements IBadgeDropDownContentItem{
    text?: string = '';
    active?: boolean = false;
    icon?: string = '';
    link?: string = '';
}
