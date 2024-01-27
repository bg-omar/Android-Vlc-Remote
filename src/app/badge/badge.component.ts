import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {BadgeDropDownContentItem} from './badge.type';

@Component({
    selector: 'bg-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})

export class BadgeComponent<T> implements OnInit {
    @Input() isBadgeActive: boolean = true;
    @Input() useHover: boolean = false;
    @Input() isClickable: boolean = false;
    @Input() badgeIcon: string = null;
    @Input() badgeText: string = '';
    @Input() toUppercase: boolean = true;
    @Input() badgeIconRight: boolean = true;
    @Input() tooltipMessage: string = '';
    @Input() notifications: string = '';
    @Input() showPin: boolean;
    @Input() disabled: boolean;
    @Input() loading: boolean = false;
    @Input() dropDownContents: Array<BadgeDropDownContentItem>;
    @Output() badgeClicked: EventEmitter<T> = new EventEmitter<T>();
    @Output() clickEmitter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    @Output() dropdownEmit: EventEmitter<any> = new EventEmitter<any>();
    dropdownOpen: boolean = false;
    emitValue: T;


    ngOnInit(): void {
        this.toUppercase = (this.toUppercase === undefined) ? true : this.toUppercase;
        this.setNotification();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dropDownContents'] || changes['showPin']) {

        }
    }


    onDropdownClick(Active: boolean, Text: string): void {

        let item: BadgeDropDownContentItem = {
            text: Text,
            active: Active,
        }


        this.dropdownEmit.emit(item);
        this.dropdownOpen = !this.dropdownOpen;
    }

    handleBadgeClick(event: MouseEvent): void {
        if (this.dropDownContents) {
            this.dropdownOpen = !this.dropdownOpen;

        } else if (!this.disabled && !this.loading) {

            this.clickEmitter.emit(event);
        }
        if (this.isClickable){
            this.badgeClicked.emit(this.emitValue);
        }
    }
    setNotification(){
        if (this.showPin) {
            this.dropDownContents.forEach((item, index) => {
                if (item.active) {
                    index += 1;
                    this.notifications = index.toString();
                }
                item.icon = item.active ? 'pin' : 'un-pin'
            });
        } else {
            this.notifications = this.notifications || '';
        }
    }
}
