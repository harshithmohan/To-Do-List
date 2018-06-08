import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

interface UserData {
  name: string;
  total: number;
  completed: number;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];
  userSet: boolean;
  userData: UserData;

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

  getCollection(name) {
    this.userData.name = name.value.trim();
    if (this.userData.name.length > 0) {
      name.value = null;
      this.userSet = true;
      this.toDoService.getTaskCollection(this.userData.name).snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const data = element.payload.doc.data();
          data['$key'] = element.payload.doc.id;
          this.toDoListArray.push(data);
        });

        this.toDoListArray.sort((a, b) => {
          return b.isStarred - a.isStarred;
        });

        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });

        this.getDetails();
      });
    } else {
      window.alert('Enter a valid name');
    }
  }

  getDetails() {
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
      this.toDoService.addTask(item.value.trim());
      item.value = null;
    } else {
      window.alert('Enter a valid title');
    }
  }

  swapCheck(key: string, isChecked: boolean) {
    this.toDoService.checkOrUncheckTask(key, !isChecked);
  }

  swapStarred(key: string, isStarred: boolean) {
    this.toDoService.starOrUnstarTask(key, !isStarred);
  }

  deleteItem(key: string) {
    this.toDoService.removeTask(key);
  }

  logout() {
    this.userData.name = '';
    this.userSet = false;
    this.toDoListArray = [];
  }

}
