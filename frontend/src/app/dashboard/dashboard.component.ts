import {Component} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {Data} from '../_models/data';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dataService: BackendService, public dialog: MatDialog, public auth: AuthService) {
  }

  displayedColumns = ['date_created', 'key', 'value', 'delete'];
  dataSource = new PostDataSource(this.dataService);

   openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '500px',
      data: 'Add Post'
    });

    dialogRef.componentInstance.event.subscribe(async(result) => {
      await this.dataService.addPost(result.data).subscribe( () => {
        this.dataSource = new PostDataSource(this.dataService);
      });
    });
  }

  async deletePost(id: number, index: number) {
    if (this.auth.isLoggedIn()) {
      if(confirm("Are you sure to delete this record?")) {
        await this.dataService.deletePost(id, index).subscribe((result: any)=>{
          this.dataSource = new PostDataSource(this.dataService);
        });
      }
    } else {
      alert('Login in Before');
    }
  }

  getFullValue(id: number){
    console.log('Not implemented');
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: BackendService) {
    super();
  }

  connect(): Observable<Data[]> {
    console.log('PostDataSource');
    return this.dataService.getData();
  }

  disconnect() {
  }
}
