import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(user: string) {
    this.toDoList = this.firebasedb.list(user);
    return this.toDoList;
  }

  addItem(title: string) {
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUncheckItem($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag});
  }

  removeItem($key: string) {
    this.toDoList.remove($key);
  }

}
