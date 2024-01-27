import {BadgeComponent} from './badge.component';
import {TestBed} from '@angular/core/testing';

describe('BadgeComponent', (): void => {
    let badgeComponent: BadgeComponent<any>;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            declarations: [BadgeComponent]
        })
            .compileComponents();
    });

    beforeEach((): void => {
        const fixture = TestBed.createComponent(BadgeComponent);
        badgeComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(badgeComponent).toBeTruthy();
    });
});
