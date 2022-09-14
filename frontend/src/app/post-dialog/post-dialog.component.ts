import {Component, EventEmitter, Inject} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {
  post = {
    key: '',
    value: ''
  };

  postForm = this.fb.group({
    key: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    value: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
  });

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: BackendService,
    private fb: FormBuilder
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const val = this.postForm.value;

    if(this.postForm.invalid)
      return;

    if(val.key && val.value)
    {
      this.event.emit({data: val});
      this.dialogRef.close();
    }
  }
}
