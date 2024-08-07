import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Data {
  id?: number; // Make id optional
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  data$ = this.dataSubject.asObservable();
  private dataStore: Data[] = [];

  constructor() {}

  addData(newData: Data) {
    newData.id = this.dataStore.length + 1;
    this.dataStore.push(newData);
    this.dataSubject.next([...this.dataStore]);
  }

  deleteData(id: number) {
    this.dataStore = this.dataStore.filter((item) => item.id !== id);
    this.dataSubject.next([...this.dataStore]);
  }

  updateData(updatedData: Data) {
    const index = this.dataStore.findIndex(
      (item) => item.id === updatedData.id
    );
    if (index !== -1) {
      this.dataStore[index] = updatedData;
      this.dataSubject.next([...this.dataStore]);
    }
  }

  getDataById(id: number): Data {
    return (
      this.dataStore.find((item) => item.id === id) || {
        id: undefined,
        name: '',
        email: '',
      }
    );
  }
}
