import {
    Component,
    HostListener,
    Input,
    ViewChild,
    Output,
    EventEmitter,
    SimpleChanges,
    OnChanges,
    ElementRef, forwardRef
} from '@angular/core';
import {SingleDropDownOption, GroupedDropDownOption, DropdownDirection} from './dropdown.type';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'bg-dropdown-list',
    templateUrl: './dropdown-list.component.html',
    styleUrls: ['./dropdown-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownListComponent),
            multi: true
        }
    ]
})
export class DropdownListComponent implements OnChanges, ControlValueAccessor {
    @Input() searchBar: boolean = false;
    @Input() checkBoxes: boolean = false;
    @Input() selectAllOption: boolean = false;
    @Input() collapsibleCategories: boolean = false;
    @Input() singleOptions: SingleDropDownOption[];
    @Input() groupedOptions: GroupedDropDownOption[];
    @Input() placeholder: string;
    @Input() disabled: boolean = false;
    @Input() dropdownDisabled: boolean = false;
    @Input() dynamicDropdownDirection: boolean = false;
    @Input() dropdownDirection: DropdownDirection = "DOWN";

    @Input() hasBorder: boolean = true;
    @Input() isCompact: boolean = false;
    searchInputValidationError: boolean = false;
    @Input() searchInputValidationRegex: any;
    @Input() searchInputValidationErrorMessage: string;
    searchInputLimitError: boolean = false;
    @Input() searchInputLimit: number;
    @Input() searchInputLimitErrorMessage: string;
    allowInput: boolean = true;

    private readonly UNKNOWN_OPTION_NAME_PREFIX: string = 'Unknown: ';
    private currentValue: any = null;
    private clickSubscription: Subscription;

    private _onChange: any;

    dropDownwards: boolean = true;

    @Input()
    availableOptions: SingleDropDownOption[];

    @Output() optionClickEvent: EventEmitter<SingleDropDownOption[]> = new EventEmitter<SingleDropDownOption[]>();

    @ViewChild('bgDropdown', {static: false}) dropdownElement: ElementRef;
    @ViewChild('bgDropdownToggle', {static: false}) dropdownToggleElement: ElementRef;
    @ViewChild('body', {static: false}) htmlBody: ElementRef;

    dropdownOpen: boolean = false;
    selectAll: boolean = false;
    selectedOptions: SingleDropDownOption[];

    constructor() {
        this.singleOptions = [];
        // Workaround for bug fixed in 9a8564cbded1f00c254a3a8d353ad823e10e685d, not yet available here
        this.selectedOptions = [];

        this.clickSubscription = this.optionClickEvent
            .subscribe((options: SingleDropDownOption[]) => {
                this.currentValue = options[0].value;
                if (options.filter(opt => this.isUnknownOption(opt)).length === 0) {
                    // Remove unknown option, if present
                    const idx = options.findIndex(opt => this.isUnknownOption(opt));
                    if (idx >= 0) {
                        options.splice(idx, 1);
                    }
                }
                if (this._onChange) {
                    this._onChange(options[0].value);
                }
            });
    }

    ngOnInit(): void {
        this.dropDownwards = this.dropdownDirection === "DOWN" ? true : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['singleOptions'] || changes['groupedOptions']) {
            this.setSelectedOptions();
            if (this.selectedOptions.length > 0) {
                this.placeholder = '';
            }
        }

        if (changes['availableOptions']) {
            const options = [...changes['availableOptions'].currentValue as SingleDropDownOption[]];
            const selected = this.singleOptions
                .filter(opt => opt.isSelected)
                .map(opt => opt.value);
            if (selected.length === 0 && this.currentValue) {
                const unknownOption = this.createUnknownOption(this.currentValue);
                selected.push(unknownOption);
                options.unshift(unknownOption);
            }
            this.singleOptions = options.map(opt => ({
                ...opt,
                isSelected: selected.includes(opt.value)
            }));
        }
    }

    @HostListener('document:click', ['$event'])
    windowClick(event: MouseEvent): void {
        if (this.dropdownToggleElement && this.dropdownToggleElement.nativeElement.contains(event.target) === true) {

            if (this.dynamicDropdownDirection) {
                const dropDownElement = this.dropdownElement?.nativeElement.getBoundingClientRect();
                this.dropDownwards = dropDownElement ? ((window.innerHeight - dropDownElement.bottom) > dropDownElement.height) : false;
            }
            return;
        }
        if (this.dropdownElement && this.dropdownElement.nativeElement.contains(event.target) === false) {
            this.resetErrors();
            this.toggleDropdown(false);
        }
    }

    toggleDropdown(isOpen?: boolean): void {
        if (!this.disabled && !this.dropdownDisabled) {
            this.dropdownOpen = isOpen === undefined ? !this.dropdownOpen : isOpen;

            if (!this.dropdownOpen) {
                this.dropdownFilter('');
            }
        }
    }

    toggleItemGroup(groupIndex: number): void {
        this.groupedOptions[groupIndex].groupIsOpen = !this.groupedOptions[groupIndex].groupIsOpen;
    }

    dropdownFilter(event: any): void {
        if (!this.allowInput) {
            if (event.key === 'Backspace' || event.key === 'Delete' || (event.key === 'x' && event.ctrlKey)) {
                this.allowInput = this.onKeyPress(event);
            }
            if (!this.allowInput) {
                return;
            }
        }
        this.resetErrors();
        const searchTerm: string = (event) ? event.target.value.toUpperCase() : '';
        if (this.groupedOptions) {
            this.groupedOptions.forEach((groupedOption: GroupedDropDownOption) => {
                let groupHasDisplayedOption: boolean = false;

                groupedOption.singleOptions.forEach((singleOption: SingleDropDownOption) => {
                    const upperCaseSingleOption = singleOption.name.toUpperCase();
                    const singleOptionContainsSearchTerm = upperCaseSingleOption.includes(searchTerm);
                    singleOption.hidden = !singleOptionContainsSearchTerm;

                    if (singleOptionContainsSearchTerm) {
                        groupHasDisplayedOption = true;
                    }
                });

                groupedOption.hidden = !groupHasDisplayedOption;
            });
        } else if (this.singleOptions) {
            this.singleOptions.forEach((singleOption: SingleDropDownOption) => {
                const upperCaseSingleOption = singleOption.name.toUpperCase();
                singleOption.hidden = !upperCaseSingleOption.includes(searchTerm);
            });
        }
    }

    setSelectedOptions(): void {
        this.selectedOptions = [];
        if (this.groupedOptions) {
            this.groupedOptions.forEach((groupedOption: GroupedDropDownOption) => {
                this.populateSelectedOptionsArray(groupedOption.singleOptions);
            });
        } else if (this.singleOptions) {
            this.populateSelectedOptionsArray(this.singleOptions);
        }
    }

    selectOption(option: SingleDropDownOption): void {
        this.dropdownOpen = false;
        this.placeholder = '';
        this.selectedOptions = [option];
        this.singleOptions.forEach((singleOption: SingleDropDownOption): boolean =>
            singleOption.isSelected = singleOption === option
        );
        this.optionClickEvent.emit(this.selectedOptions);
        this.singleOptions.forEach((singleOption: SingleDropDownOption): boolean =>
            singleOption.hidden = false
        );
        if (this._onChange) {
            this._onChange(this.selectedOptions);
        }
    }

    populateSelectedOptionsArray(singleOptions: SingleDropDownOption[]): void {
        singleOptions.forEach((singleOption: SingleDropDownOption) => {
            if (singleOption.isSelected) {
                this.selectedOptions.push(singleOption);
            }
        });
    }

    selectedOptionsToString(selectedOptions: SingleDropDownOption[]): string {
        let selectedOptionsString = '';

        selectedOptions.forEach((selectedOption: SingleDropDownOption, index: number) => {
            const suffix = (selectedOptions.length - 1) !== index ? ', ' : '';
            selectedOptionsString = selectedOptionsString + selectedOption.name + suffix;
        });

        return selectedOptionsString;
    }

    selectAllToggle(selectAll: boolean): void {
        this.selectAll = selectAll;

        if (this.groupedOptions) {
            this.groupedOptions.forEach((groupedOption: GroupedDropDownOption) => {
                this.selectOptions(selectAll, groupedOption.singleOptions);
            });
        } else {
            this.selectOptions(selectAll, this.singleOptions);
        }

        this.setSelectedOptions();
    }

    selectOptions(selectAll: boolean, singleOptions: SingleDropDownOption[]): void {
        singleOptions.forEach((singleOption: SingleDropDownOption) => {
            singleOption.isSelected = selectAll;
        });
    }

    setSingleValue(optionIndex: number, groupIndex?: number): void {
        this.selectAllToggle(false);
        this.setSelectedValue(true, optionIndex, groupIndex);
    }

    setSelectedValue(selectedValue: boolean, optionIndex: number, groupIndex?: number): void {
        if (groupIndex >= 0) {
            this.groupedOptions[groupIndex].singleOptions[optionIndex].isSelected = selectedValue;
        } else {
            this.singleOptions[optionIndex].isSelected = selectedValue;
        }

        this.setSelectedOptions();
    }

    onKeyPress(event: any): boolean {
        const characterCount: number = event.target.value.length;
        if (this.searchInputValidationRegex) {
            this.allowInput = this.searchInputValidationRegex.test(event.key);
            if (!this.allowInput) {
                this.searchInputValidationError = true;
                return this.allowInput;
            }
        }
        if (this.searchInputLimit) {
            this.allowInput = characterCount < this.searchInputLimit;
            if (!this.allowInput) {
                this.searchInputLimitError = true;
                return this.allowInput;
            }
        }
        return this.allowInput;
    }

    resetErrors(): void {
        this.searchInputValidationError = false;
        this.searchInputLimitError = false;
        this.allowInput = true;
    }

    writeValue(value: any): void {
        this.currentValue = value;
        const options: SingleDropDownOption[] = [];
        let anySelected = false;
        for (const opt of this.singleOptions) {
            if (!this.isUnknownOption(opt)) {
                const isSelected = opt.value === value;
                anySelected = anySelected || isSelected;
                options.push({...opt, isSelected});
            }
        }
        if (!anySelected && this.currentValue) {
            options.unshift(this.createUnknownOption(this.currentValue));
        }
        this.singleOptions = options;

        // Janky piece of shit DropdownSelectorComponent can't maintain it's internal state properly, and
        // needs us to go in and fix it's otherwise unbindable fields
        this.selectedOptions = [...this.singleOptions.filter(opt => opt.isSelected)];
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    private isUnknownOption(opt: SingleDropDownOption): boolean {
        return opt.name.startsWith(this.UNKNOWN_OPTION_NAME_PREFIX);
    }

    private createUnknownOption(value: any): SingleDropDownOption {
        return {
            name: `${this.UNKNOWN_OPTION_NAME_PREFIX}${value}`,
            value,
            isSelected: true,
            hidden: false
        };
    }
}
