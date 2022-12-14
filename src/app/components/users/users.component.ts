import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

import {MatSort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  usersList: any;  // to store users
  check: boolean = true;  // for toggle between list and grid view
  displayedColumns: string[] = ['id', 'name', 'username', 'date']; //columns for users table

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = false;

  constructor(private http: HttpClient) {

  }
  
  ngOnInit(): void {
    this.getData().subscribe(next=>{
      this.usersList = next;
      this.length = this.usersList.length;
      this.dataSource = new MatTableDataSource(this.usersList);
      debugger
   
      console.log(this.usersList)
    })
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
}

  // FUnction for pagination
  setPagination(value: number){
    var updatedUserList: any = []; // to store updated list after pagination
    value = value + 1;
    updatedUserList.splice(0);
    for(let i=0; i<value; i++)
    {
      updatedUserList.push(this.usersList[i]);
    }
    this.dataSource = new MatTableDataSource(updatedUserList);
    console.log("Selected size: " + value);
  }

  // Function to retrieve data
  getData():Observable<any>{
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }

  // Filter Function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Toggle Function
  onValChange(value: string){
    if(value == 'list')
    {
      this.check = !this.check;
    }
    else if('grid')
    {
      this.check = !this.check;
    }
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const skip= this.pageIndex*this.pageSize;
    this.dataSource = new MatTableDataSource(this.usersList.slice(skip,skip+this.pageSize));
    return event;
  }
}



