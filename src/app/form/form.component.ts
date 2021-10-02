import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
    @Input() todoList: any
    todo: any
    @Output() modalEvent = new EventEmitter()
    @Output() updateEvent = new EventEmitter()
    public reactiveForm: FormGroup;
    public newCategory: boolean = false;

    constructor(private fb: FormBuilder, private http: HttpClient){}

    ngOnInit(){  
        this.initForm();
    }
    initForm(){
        this.reactiveForm = this.fb.group({
        text: ['', [
            Validators.required,
            Validators.pattern(/[А-я]/)
            ]
        ],
        selectedCategory: [
            ''
        ],
        category: [''
        ]
        });
    }
    isControlInvalid(controlName: string): boolean {
        const control = this.reactiveForm.controls[controlName];
        const result = control.invalid && control.touched;
        return result;
    }

    onSubmit(event: any) {
        event.preventDefault()
        const controls = this.reactiveForm.controls;
        if (this.reactiveForm.invalid) {
            Object.keys(controls)
            .forEach(controlName => controls[controlName].markAsTouched());
            return;
        }
        if(this.reactiveForm.controls.category.value) {
            this.http.post('https://aqueous-waters-16302.herokuapp.com/todos', {
                title: this.reactiveForm.controls.category.value,
                text: this.reactiveForm.controls.text.value
            }).subscribe(todo => {
                this.reactiveForm.reset()
                this.closeModal()
                this.updateTodos()
                })
        } else {
             this.http.post('https://aqueous-waters-16302.herokuapp.com/todos', {
                id: this.reactiveForm.controls.selectedCategory.value,
                text: this.reactiveForm.controls.text.value
            }).subscribe(todo => {
                this.reactiveForm.reset()
                this.closeModal()
                this.updateTodos()
                })
        }
    }

    updateTodos() {
        this.updateEvent.emit()
    }

    onChange(event: any) {
        if(event === 'new') {
            this.newCategory = true
        } else {
            this.newCategory = false
        }
    }

    closeModal() {
        this.modalEvent.emit(false)
    }
}