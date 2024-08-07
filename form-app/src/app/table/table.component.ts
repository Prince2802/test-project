import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Data } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  //receive data array from parent component
  @Input() data: Data[] = []; // Initialize data with an empty array
  @Output() deleteData = new EventEmitter<number>(); //Output event to emit the ID of the data,item to be deleted to the parent component
  @Output() editData = new EventEmitter<Data>(); // Output event to emit the data item to be edited to the parent component

  onEdit(item: Data) {
    this.editData.emit(item); // Emit data item to the parent component
  }

  onDelete(id?: number) {
    if (id !== undefined) {
      this.deleteData.emit(id); // Emit ID of the data item to be deleted to the parent component
    }
  }
}
