import {TestBed} from '@angular/core/testing';
import {InputComponent} from './input.component';

describe('InputComponent', (): void => {
    let component: InputComponent;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            declarations: [InputComponent],
        }).compileComponents();
        const fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
    });

    it('should emit keyUpChange when check content is called', (): void => {
        spyOn(component.inputChange, 'emit');
        component.content = 'content';
        component.checkContent();
        expect(component.inputChange.emit).toHaveBeenCalledWith('content');
    });

    it('should add the prefix in checkcontent when type of input is extended', (): void => {
        spyOn(component.inputChange, 'emit');
        component.content = 'content';
        component.selectedPrefixOption = 'pre-';
        component.type = 'extended';
        component.checkContent();
        expect(component.inputChange.emit).toHaveBeenCalledWith('pre-content');
    });

    it('should notify the form group with _onChange when _onChange is set', (): void => {
        // @ts-ignore
        component['_onChange'] = jasmine.createSpy('_onChange');
        component.content = '_onChange';
        component.checkContent();
        expect(component['_onChange']).toHaveBeenCalled();
    });
});
