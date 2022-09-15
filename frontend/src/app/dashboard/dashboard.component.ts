import { Component, ViewChild } from '@angular/core';
import {BackendService} from '../_services/backend.service';
import { Data, DataResponse } from '../_models/data';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  //private dataSource: PostDataSource;

  totalRows = 0;
  isLoading = false;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource!: MatTableDataSource<Data>;
  displayedColumns: string[] = ['createdAt', 'key', 'value', 'delete'];

  constructor(private dataService: BackendService, public dialog: MatDialog, public auth: AuthService) {
    //this.dataSource = new PostDataSource(this.dataService);
    //this.recordsList = this.dataSource.connect();

    //this.recordsList.subscribe(result => {
      //this.totalCount = result.length
    //});
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    let data:Data[] = [];



    this.dataService.getData(this.pageSize, this.currentPage).subscribe(result => {
      result.rows.forEach( (i, e) => {
        data.push(i);
      });

      this.dataSource = new MatTableDataSource<Data>(data)
      //this.dataSource.paginator = this.paginator
      //this.dataSource.sort = this.sort
      this.totalRows = result.count;
      this.isLoading = false;
    });
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  //recordsList: Observable<Data[]>;




   openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '500px',
      data: 'Add Post'
    });

    dialogRef.componentInstance.event.subscribe(async(result) => {
      await this.dataService.addPost(result.data).subscribe( () => {
        //this.dataSource = new PostDataSource(this.dataService);
      });
    });
  }

  async deletePost(id: number, index: number) {
    if (this.auth.isLoggedIn()) {
      if(confirm("Are you sure to delete this record?")) {
        await this.dataService.deletePost(id, index).subscribe((result: any)=>{
          //this.dataSource = new PostDataSource(this.dataService);
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

/*
export class PostDataSource extends DataSource<any> {
  constructor(private dataService: BackendService) {
    super();
  }

  connect(): Observable<Data[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}
*/

