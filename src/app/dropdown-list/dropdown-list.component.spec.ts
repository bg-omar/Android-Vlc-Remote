import {SimpleChanges} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DropdownListComponent} from './dropdown-list.component';
import {GroupedDropDownOption, SingleDropDownOption} from './dropdown.type';
import createSpy = jasmine.createSpy;

describe('DropdownListComponent', (): void => {
    let component: DropdownListComponent;
    let fixture: ComponentFixture<DropdownListComponent>;

    let singleDropDownOptions: SingleDropDownOption[];
    let groupedDropDownOptions: GroupedDropDownOption[];

    const SINGLE_OPTIONS: SingleDropDownOption[] = [
        {
            name: 'Option 1',
            isSelected: false,
            value: 'Value 1'
        },
        {
            name: 'Option 2',
            isSelected: false,
            value: 'Value 2'
        },
        {
            name: 'Option 3',
            isSelected: false,
            value: 'Value 3'
        }
    ];
    const GROUPED_OPTIONS: GroupedDropDownOption[] = [
        {
            groupName: 'Group 1',
            groupIsOpen: true,
            singleOptions: [
                {
                    name: 'Group 1 - Option 1',
                    isSelected: false,
                    value: 'Value 1-1'
                },
                {
                    name: 'Group 1 - Option 2',
                    isSelected: false,
                    value: 'Value 1-2'
                }
            ]
        },
        {
            groupName: 'Group 2',
            groupIsOpen: false,
            singleOptions: [
                {
                    name: 'Group 2 - Option 1',
                    isSelected: false,
                    value: 'Value 2-1'
                },
                {
                    name: 'Group 2 - Option 2',
                    isSelected: false,
                    value: 'Value 2-2'
                }
            ]
        }
    ];

    const mockSimpleChanges: SimpleChanges = {
        singleOptions: {
            currentValue: singleDropDownOptions,
            firstChange: false,
            isFirstChange(): boolean {
                return false;
            },
            previousValue: []
        }
    };

    const keyUpEvent: any = {
        target: {
            value: '3'
        }
    }

    beforeEach((): void => {
        fixture = TestBed.createComponent(DropdownListComponent);
        component = fixture.componentInstance;
        component.selectedOptions = [];

        singleDropDownOptions = SINGLE_OPTIONS;
        groupedDropDownOptions = GROUPED_OPTIONS;

        fixture.detectChanges();
    });

    afterEach(() => {
        singleDropDownOptions = [];
        groupedDropDownOptions = [];
        component.singleOptions = [];
        component.groupedOptions = [];

        fixture.destroy();
    });

    it('should handle ngOnChanges', (): void => {
        component['setSelectedOptions'] = createSpy('setSelectedOptions');
        component.ngOnChanges({});
        expect(component['setSelectedOptions']).not.toHaveBeenCalled();

        component.selectedOptions = [singleDropDownOptions[0]];
        component.ngOnChanges(mockSimpleChanges);
        expect(component['setSelectedOptions']).toHaveBeenCalled();
        expect(component.placeholder).toBe('');
    });

    it('should toggle the dropdown state', (): void => {
        component.singleOptions = singleDropDownOptions;
        expect(component.dropdownOpen).toBe(false);

        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(true);

        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(false);
    });

    it('should toggle an itemgroup\'s visibility', (): void => {
        component.groupedOptions = groupedDropDownOptions;

        component.toggleItemGroup(0);
        expect(component.groupedOptions[0].groupIsOpen).toBe(false);
    });

    it('should filter single dropdown items', (): void => {
        component.singleOptions = singleDropDownOptions;

        component.dropdownFilter(keyUpEvent);
        expect(component.singleOptions[0].hidden).toBe(true);
        expect(component.singleOptions[1].hidden).toBe(true);
        expect(component.singleOptions[2].hidden).toBe(false);
    })

    it('should emit the correct value when an item is selected', (): void => {
        spyOn(component['optionClickEvent'], 'emit');
        component.singleOptions = singleDropDownOptions;

        component.selectOption(singleDropDownOptions[0]);
        expect(component.selectedOptions.length).toBe(1);
        expect(component.optionClickEvent.emit).toHaveBeenCalledWith([singleDropDownOptions[0]]);
    });

    it('should \'stringify\' the selected options', (): void => {
        component.singleOptions = singleDropDownOptions;

        const selectedValuesString: string = component.selectedOptionsToString(singleDropDownOptions);
        expect(selectedValuesString).toBe('Option 1, Option 2, Option 3');
    });

    it('should toggle all single options', (): void => {
        component.singleOptions = singleDropDownOptions;

        component.selectAllToggle(true);
        expect(component.selectedOptions.length).toBe(3);
    });

    it('should toggle all grouped options', (): void => {
        component.groupedOptions = groupedDropDownOptions;

        component.selectAllToggle(true);
        expect(component.selectedOptions.length).toBe(4);
    });

    it('should set a single value', (): void => {
        component.singleOptions = singleDropDownOptions;

        component.setSingleValue(0);
        expect(component.selectedOptions.length).toBe(1);
    });
});

