import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];
  user: string;
  userSet: boolean;

  constructor(private toDoService: TodoService) {
    this.userSet = false;
  }

  ngOnInit() {
  }

  getList(name) {
    this.user = name.value;
    name.value = null;
    this.userSet = true;
    this.toDoService.getToDoList(this.user).snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoListArray.push(x);
      });

      this.toDoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

  onAdd(item) {
    this.toDoService.addItem(item.value);
    item.value = null;
  }

  swapCheck(key: string, isChecked: boolean) {
    if (isChecked) {
      this.toDoService.checkOrUncheckItem(key, false);
    } else {
      this.toDoService.checkOrUncheckItem(key, true);
    }
  }

  deleteItem(key: string) {
    this.toDoService.removeItem(key);
  }

  logout() {
    this.user = '';
    this.userSet = false;
    this.toDoListArray = [];
  }

}
