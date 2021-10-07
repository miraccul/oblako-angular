import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { Project } from './project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public modalIsOpen: boolean = false;
  public todoList: Project[];
  constructor(private projectsService: ProjectService) {}

  ngOnInit() {    
    this.projectsService.getAllProjects();
    this.projectsService.entities$.subscribe(todo => this.todoList = todo);
  }

  public track(index: number, item: Project): number {
    return item.id
  }

  openModal(): void {
    this.modalIsOpen = true;
  }
   
  closeModal(): void {
    this.modalIsOpen = false;
  }
}
