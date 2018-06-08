import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

interface Task {
  title: string;
  isChecked: boolean;
  isStarred: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  taskCollection: AngularFirestoreCollection<Task>;
  constructor(private afs: AngularFirestore) { }

  getTaskCollection(user: string) {
    this.taskCollection = this.afs.collection<Task>('users/' + user + '/tasks');
    return this.taskCollection;
  }

  addTask(title: string) {
    this.taskCollection.add({
      title: title,
      isChecked: false,
      isStarred: false
    });
  }

  checkOrUncheckTask($key: string, flag: boolean) {
    this.taskCollection.doc($key).update({ isChecked: flag });
  }

  starOrUnstarTask($key: string, flag: boolean) {
    this.taskCollection.doc($key).update({ isStarred: flag });
  }

  removeTask($key: string) {
    this.taskCollection.doc($key).delete();
  }

}
