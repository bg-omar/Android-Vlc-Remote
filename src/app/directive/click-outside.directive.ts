import {Directive, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[bgClickOutside]',
})
export class BgClickOutsideDirective {

    @Output() bgClickOutside: EventEmitter<void> = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(target: any): void {
        const clickedInside: boolean = this.elementRef.nativeElement.contains(target);
        if (!clickedInside) {
            this.bgClickOutside.emit();
        }
    }
}
