import {Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';


@Component({
    selector: 'bg-icon',
    templateUrl: './icon.component.html',
    styleUrls: [
        './icon.component.scss',
        './icon-general.component.scss',
    ]
})
export class IconComponent {
    @Input() type: string;
    @Input() size: string = 'small';
    @Input() color: string;
    @Input() disabled: boolean;
    @Output() clickEmitter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    dropdownOpen: boolean = false;
    parentTr: ElementRef;

    constructor(private elRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.parentTr = this.elRef.nativeElement.closest('tbody tr.main-body');
    }

    @HostListener('document:click', ['$event'])
    click(event) {

    }

    onClick(event: MouseEvent): void {
        if (!this.disabled) {
            this.clickEmitter.emit(event);
        }
    }


}
