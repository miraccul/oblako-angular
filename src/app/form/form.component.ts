import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from "../services/project.service";
import { Project } from "../project";
import { Todo } from "../todo";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
    @Input() todoList: Project[];
    @Output() modalEvent = new EventEmitter()
    public reactiveForm: FormGroup;
    public newCategory: boolean = false;

    constructor(private fb: FormBuilder, private http: HttpClient, private projectsService: ProjectService){}

    ngOnInit(){  
        this.initForm();
    }
    
    initForm(){
        this.reactiveForm = this.fb.group({
            text: [null, [Validators.required]],
            selectedCategory: [null, [Validators.required]],
            category: [null]
        });
    }

    onSubmit() {
        this.projectsService.addTodo(
            this.reactiveForm.value.text,
            !this.newCategory ? this.reactiveForm.value.selectedCategory: undefined,
            this.newCategory ? this.reactiveForm.value.category : undefined);
        this.reactiveForm.reset()
        for(var name in this.reactiveForm.controls) {
            this.reactiveForm.controls[name].setErrors(null);
        }
        this.closeModal()
    }

    onChange(event) {
        if(event.value === 'newCategory') {
            this.newCategory = true;
            this.reactiveForm.controls["category"].setValidators(Validators.required);
        } else {
            this.newCategory = false;
            this.reactiveForm.controls["category"].clearValidators();
        }
        this.reactiveForm.controls["category"].updateValueAndValidity();
    }

    closeModal() {
        this.newCategory = false;
        this.modalEvent.emit()
    }

    track(index: number, item: Project):number {
        return item.id;
    }
}