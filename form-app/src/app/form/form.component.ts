import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnChanges {
  //receive the current data from parent component
  @Input() currentData: Data = { id: undefined, name: '', email: '' }; // Initialize currentData with a default value
  //determine if we are in editing mode
  @Input() isEditing: boolean = false; // Initialize isEditing with a default value
  //event to emit new data to parent component
  @Output() addData = new EventEmitter<Data>();
  //event to emit updated data to parent component
  @Output() updateData = new EventEmitter<Data>();
  form: FormGroup; // Reactive form group to manage form controls
  error: string = ''; // Variable to store error messages

  constructor(private fb: FormBuilder) {
    // Initializing form group with form controls and validators
    this.form = this.fb.group({
      id: [undefined],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check if currentData input has changed
    if (changes['currentData'] && changes['currentData'].currentValue) {
      // Update form values with the new currentData values
      this.form.patchValue(changes['currentData'].currentValue);
    }
  }

  onSubmit() {
    // Check if form is invalid
    if (this.form.invalid) {
      this.error = 'All fields are required.';
      return;
    }
    this.error = '';
    const formData: Data = this.form.value;
    if (this.isEditing) {
      // Check if we are in editing mode
      this.updateData.emit(formData); // Emit updated data to the parent component
    } else {
      this.addData.emit(formData); // Emit new data to the parent component
    }
    this.form.reset(); // Reset form
  }
}
