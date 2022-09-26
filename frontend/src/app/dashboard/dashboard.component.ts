import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {BackendService} from '../_services/backend.service';
import { Data } from '../_models/data';
import { fromEvent, tap } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  totalRows = 0;
  isLoading = false;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource!: MatTableDataSource<Data>;
  displayedColumns: string[] = ['createdAt', 'key', 'value', 'delete'];
  searchText = '';

  @ViewChild('input') input: ElementRef | undefined;

  constructor(private dataService: BackendService, public dialog: MatDialog, public auth: AuthService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    let data:Data[] = [];

    this.dataService.getData(this.pageSize, this.currentPage, this.searchText).subscribe(result => {
      result.rows.forEach( (i, e) => {
        data.push(i);
      });

      this.dataSource = new MatTableDataSource<Data>(data)
      this.totalRows = result.count;
      this.isLoading = false;
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '500px',
      data: 'Add Post'
    });

    dialogRef.componentInstance.event.subscribe(async(result) => {
      await this.dataService.addPost(result.data).subscribe( () => {
        this.loadData();
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

  ngAfterViewInit() {
    fromEvent(this.input?.nativeElement,'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(250),
        distinctUntilChanged(),
        tap((text) => {
          this.searchText = this.input?.nativeElement.value;//.toLowerCase();
          this.loadData();
        })
      )
      .subscribe();
  }

  async search(){
    if(this.searchText.length === 0){
      return;
    }

    this.loadData();
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

