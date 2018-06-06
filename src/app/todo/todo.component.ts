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
  userSet: boolean;
  userData: any;

  constructor(private toDoService: TodoService) {
    this.userSet = false;
    this.userData = {
      name: '',
      total: 0,
      completed: 0
    };
  }

  ngOnInit() {
  }

  getList(name) {
    this.userData.name = name.value.trim();
    if (this.userData.name.length > 0) {
      name.value = null;
      this.userSet = true;
      this.toDoService.getToDoList(this.userData.name).snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
        this.toDoListArray.sort((a, b) => {
          return b.isStarred - a.isStarred;
        });

        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });

        this.getUserDetails();
      });
    } else {
      window.alert('Enter a valid name');
    }
  }

  getUserDetails() {
    let total = 0, completed = 0;
    this.toDoListArray.forEach(item => {
      total++;
      if (item.isChecked) {
        completed++;
      }
    });
    this.userData.total = total;
    this.userData.completed = completed;
  }

  onAdd(item) {
    if (item.value.trim().length > 0) {
      this.toDoService.addItem(item.value.trim());
      item.value = null;
    } else {
      window.alert('Enter a valid title');
    }
  }

  swapCheck(key: string, isChecked: boolean) {
    if (isChecked) {
      this.toDoService.checkOrUncheckItem(key, false);
    } else {
      this.toDoService.checkOrUncheckItem(key, true);
    }
  }

  swapStarred(key: string, isStarred: boolean) {
    if (isStarred) {
      this.toDoService.starOrUnstarItem(key, false);
    } else {
      this.toDoService.starOrUnstarItem(key, true);
    }
  }

  deleteItem(key: string) {
    this.toDoService.removeItem(key);
  }

  logout() {
    this.userData.name = '';
    this.userSet = false;
    this.toDoListArray = [];
  }

}
