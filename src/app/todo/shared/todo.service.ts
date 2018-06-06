import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  taskList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(user: string) {
    this.taskList = this.firebasedb.list('users/' + user + '/tasks');
    return this.taskList;
  }

  addItem(title: string) {
    this.taskList.push({
      title: title,
      isChecked: false,
      isStarred: false
    });
  }

  checkOrUncheckItem($key: string, flag: boolean) {
    this.taskList.update($key, { isChecked: flag });
  }

  starOrUnstarItem($key: string, flag: boolean) {
    this.taskList.update($key, { isStarred: flag });
  }

  removeItem($key: string) {
    this.taskList.remove($key);
  }

}
