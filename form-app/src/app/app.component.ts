import { Component } from '@angular/core';
import { DataService, Data } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  data: Data[] = []; //initialize data with an empty array
  currentData: Data = { id: undefined, name: '', email: '' }; //initialize currentData with default values and optional id
  isEditing = false; // initialize isEditing with false

  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe((data) => (this.data = data)); //subscribe to the data observable
  }
  //add data
  addData(newData: Data) {
    this.dataService.addData(newData);
  }
  //delete data
  deleteData(id: number) {
    this.dataService.deleteData(id);
  }
  //edit data
  editData(dataToEdit: Data) {
    this.isEditing = true;
    this.currentData = { ...dataToEdit };
  }
  //update data
  updateData(updatedData: Data) {
    this.isEditing = false;
    this.dataService.updateData(updatedData);
    this.currentData = { id: undefined, name: '', email: '' }; //resrt current data
  }
}
