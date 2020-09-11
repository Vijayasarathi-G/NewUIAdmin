import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IUser} from '../../_interface/iuser';
import * as fromUsers from '../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  cols = [
    {key: 'id', display: 'User Id'},
    {key: 'title', display: 'Title'},
    {key: 'body', display: 'Message'},
    /*{
      key: 'dob',
      display: 'Date of Birth',
      // This column will hold a date value, so we must format the
      // display to show as a date
      config: {
        isDate: true,
        format: 'dd MMM yy'
      }
    },
    {
      key: 'actif',
      display: 'Actif/Blocked',
      // this column holds a boolean value, we will display a value
      // in true/false cases
      config: {
        isBoolean: true,
        values: {true: 'Blocked', false: 'Actif'}
      }
    },*/
    {
      key: 'action',
      display: 'Action',
      // in this column we have actions like activate/block account
      // so we will create a button and create it event click
      config: {
        isAction: true,
        actions: ['delete', 'update']
      }
    }
  ];

  users: IUser[] = [];
  public isLoading: boolean;

  constructor(private formBuilder: FormBuilder,
              private _store: Store<fromUsers.IUserState>) {
  }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', Validators.required],
    });

    this._store.dispatch(new fromUsers.GetUserLoad());
    const users$ = this._store.pipe(select(fromUsers.allUsers));

    users$.subscribe(res => {
      this.isLoading = res.isLoading;
      this.users = res.data;
    });
  }

  public getFirstTenUsers(): void {
    const firstTenUsers$ = this._store.pipe(select(fromUsers.firstTenUsers));

    firstTenUsers$.subscribe(res => {
      this.isLoading = res.isLoading;
      this.users = res.data;
    });
  }


  onActionHandler(event) {
    console.log(event);
  }

  onSubmit(value: any) {
    if (this.userForm.valid) {
      this._store.dispatch(new fromUsers.PostUser(value));

      const users$ = this._store.pipe(select(fromUsers.allUsers));

      users$.subscribe(res => {
        this.isLoading = res.isLoading;
      });

    }
  }
}
