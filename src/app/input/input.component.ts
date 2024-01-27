import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SingleDropDownOption} from '../dropdown-list/dropdown.type';
import {inputSize, inputType} from './input.type';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'bg-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
    @Input() placeholder: string;
    @Input() type: inputType = 'normal';
    @Input() iconSize: inputSize = 'small';
    @Input() disabled: boolean = false;
    @Input() isEditing: boolean = false;
    @Input() editIcon: string = 'pencil';
    @Input() content: string = '';
    @Input() error: boolean = false;
    @Input() prefixItems: SingleDropDownOption[];
    @Input() prefixIconName: string;
    @Input() prefixIconIsButton: boolean = false;
    @Input() suffixIconName: string;
    @Input() suffixIconIsButton: boolean = false;
    @Input() saveOnClickOutside: boolean = true;
    @Input() saveOnClickEnter: boolean = true;
    @Input() isCompact: boolean = false;
    @Input() isNumberInput: boolean = false;
    @Input() required: boolean = true;
    @Input() requiredMessage: string = 'This field is required';
    @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() prefixChange: EventEmitter<SingleDropDownOption[]> = new EventEmitter<SingleDropDownOption[]>();
    @Output() inputChange: EventEmitter<string | number> = new EventEmitter<string | number>();
    @ViewChild('inputText') inputText: ElementRef;
    selectedPrefixOption: string;
    private _onChange: (_: any) => void;

    ngOnInit(): void {
        if (this.type === 'extended' && this.prefixItems) {
            this.selectedPrefixOption = this.prefixItems.filter((option: SingleDropDownOption): boolean => option.isSelected == true)[0].name;
        }
    }

    onEdit(): void {
        this.isEditing = true;
        setTimeout((): void => {
            this.inputText.nativeElement.focus();
        }, 500);
    }

    saveData(): void {
        this.isEditing = false;
        this.error = this.content == '';
        let emitData: string = this.content;
        if (this.type === 'extended') {
            emitData = this.selectedPrefixOption + this.content
        }

        if (this._onChange) {
            this._onChange(emitData);
        }

        this.saveEvent.emit({
            error: this.error,
            value: emitData
        });
    }

    dropDownSelectionChange(selectedOption: SingleDropDownOption[]): void {
        this.selectedPrefixOption = selectedOption[0].name;
        this.prefixChange.emit(selectedOption);
    }

    checkContent(): void {
        this.error = !this.content;
        let emitData: string = this.type === 'extended' ? this.selectedPrefixOption + this.content : this.content;
        this.inputChange.emit(emitData);

        if (this._onChange) {
            this._onChange(emitData);
        }
    }

    registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(value: string): void {
        this.content = value;
    }
}
