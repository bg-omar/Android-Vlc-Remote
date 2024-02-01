import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITodo } from '../../models/todo.model';
import { VlcService } from '../../services/vlc.service';
import {Todo} from '../todo/todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todoedit.html',
  styleUrls: ['./todoedit.scss'],
})
export class TodoEdit implements OnInit {
  todo: ITodo = { id: '', task: '', status: false };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoService: VlcService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.todoService.getTodo(id).subscribe((data: any) => {
        this.todo = {
          id: data.id,
          task: data.task,
          status: data.status
        }
      })
    }
  }

  updateTodo(todo: ITodo) {
    this.todoService.updateTodo(todo, this.todo.id)
      .subscribe(() => {
        alert('Successful update');
        this.router.navigateByUrl('todos');
      })
  }
}
