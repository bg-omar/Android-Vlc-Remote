import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { VlcService } from '../../services/vlc.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-todo',
  templateUrl: 'todo.html',
  styleUrls: ['./todo.scss'],
})

export class Todo {
  todo: ITodo = { id: '', task: '', status: false }


  constructor(
    private router: Router,
    private todoService: VlcService) { }


  addTodo(todo: ITodo) {
    this.todoService.addTodo(todo).subscribe(() => {
      alert('Add new task successful' + todo);
      this.router.navigateByUrl('/');
    })
  }
}









