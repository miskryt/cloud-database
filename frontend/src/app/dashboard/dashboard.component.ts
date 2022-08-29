import {Component} from '@angular/core';
import {DataService} from '../_services/data.service';
import {Data} from '../_models/data';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dataService: DataService, public dialog: MatDialog, public auth: AuthService) {
  }

  displayedColumns = ['date_posted', 'key', 'value', 'delete'];
  dataSource = new PostDataSource(this.dataService);

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

  deletePost(id: number) {
    if (this.auth.isLoggedIn()) {
      this.dataService.deletePost(id);
      this.dataSource = new PostDataSource(this.dataService);
    } else {
      alert('Login in Before');
    }
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Data[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }


}
