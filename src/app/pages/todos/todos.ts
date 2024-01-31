
import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';
import { VlcService } from '../../vlc.service';

@Component({
  selector: 'app-todos',
  templateUrl: 'todos.html',
  styleUrls: ['./todos.scss'],
})
export class Todos implements OnInit {
  todos: ITodo[] = [];

  constructor(private todoService: VlcService) { }



  ngOnInit(): void {
    //debugger
    this.todoService.getTodos()
      .subscribe((data: ITodo[]) => {
        this.todos = data
      });
  }

  deleteTodo(todo: ITodo) {
    let id = todo.id ? todo.id : '';
    this.todoService.deleteTodo(id).subscribe(() => {
      alert('Delete todo : ');
    })
  }
}






