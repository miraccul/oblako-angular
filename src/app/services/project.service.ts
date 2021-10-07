import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../project';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../todo';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [];
  public entities$: BehaviorSubject<Project[]> = new BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  public getAllProjects(): void {
    this.http.get<Project[]>(`${environment.API_URL}/${environment.projects}`)
      .subscribe(res => {
        this.projects = plainToClass(Project, res)
        this.entities$.next(this.projects)
      })
  }
  
  public addTodo(text: string, category_id: number, title: string): void {
    if(category_id !== undefined) {
      this.http.post<Todo>(`${environment.API_URL}/${environment.todos}`, {
        text,
        category_id
      }).subscribe(res => {
        for(let i = 0; i < this.projects.length; i++) {
          if(res.category_id === this.projects[i].id) {
            this.projects[i].task.push(plainToClass(Todo, res))
            break;
          }
        }
      })
    } else {
      this.http.post<Project>(`${environment.API_URL}/${environment.todos}`, {
        text,
        title
      }).subscribe(res => {
        let index = this.noIncludes(res);
        if(index === -1) {
          this.projects.push(plainToClass(Project, res));
        } else {
          this.projects[index].task.push(plainToClass(Todo, res.task[res.task.length - 1]))
        }
      });
    }
  }
  
  updateTodo(id: number, category_id: number): void {
    this.http.patch<Todo>(`${environment.API_URL}/${environment.projects}/${category_id}/${environment.todos}/${id}`, {
      category_id,
      id
    }).subscribe(res => {
      for(let i = 0; i < this.projects.length; i++) {
        if(res.category_id === this.projects[i].id) {
          for(let j = 0; j < this.projects[i].task.length; j++) {
            if(res.id === this.projects[i].task[j].id) {
              this.projects[i].task[j].isComplited = res.isComplited
              break;
            }
          }
        }
      }
    });
  }
  private noIncludes(data) {
     for(let i = 0; i < this.projects.length; i++) {
       if(this.projects[i].id === data.id) {
         return i;
       } 
     }
     return -1
  }
}
