import {Input, Component, OnInit, HostListener} from "@angular/core";

@Component({
    selector: 'bg-scroll-nav',
    templateUrl: './scroll-nav.component.html',
    styleUrls: ['./scroll-nav.component.scss']
})
export class ScrollNavComponent implements OnInit {
    @Input() headerTotalHeight: number = 100;
    @Input() viscosity: number = 200;

    scrollPositionY: number = 0;
    prevScrollPositionY: number = 0;
    prevScrollDownPositionY: number = 0;
    prevScrollUpPositionY: number = 0;
    visibilityClass: string;

    ngOnInit(): void {
        this.visibilityClass = 'header-visible';
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event): void {
        this.scrollPositionY = window.scrollY;

        if (this.scrollPositionY > this.prevScrollPositionY) {
            this.prevScrollDownPositionY = this.scrollPositionY;

            if (this.scrollPositionY < this.headerTotalHeight) {
                return;
            }

            if (this.scrollPositionY - this.prevScrollUpPositionY < this.viscosity) {
                return;
            }
            this.visibilityClass = 'header-hidden';
        } else {
            this.prevScrollUpPositionY = this.scrollPositionY;

            if (this.prevScrollUpPositionY < this.headerTotalHeight) {
                this.visibilityClass = 'header-visible';
            } else if (this.prevScrollDownPositionY - this.scrollPositionY > (this.viscosity)) {
                this.visibilityClass = 'header-visible';
            } else if (this.prevScrollDownPositionY - this.scrollPositionY > this.viscosity * .5) {
                this.visibilityClass = 'nav-only';
            }

        }

        this.prevScrollPositionY = this.scrollPositionY;
    }
}
