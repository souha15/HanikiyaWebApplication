import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Permission } from '../../../shared/Models/RH/permission.model';
import { PermissionService } from '../../../shared/Services/Rh/permission.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';
@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  filter;
  constructor(private congeService: PermissionUService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.resetForm();
  }
  p: Number = 1;
  count: Number = 5;

  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.congeService.geByUser(this.UserIdConnected).subscribe(res => {
        this.filtredCongeList = res
      })
    })

  }

  //Get Conge Demand Lis

  congeList: PermissionU[] = [];
  filtredCongeList: PermissionU[] = [];
  CongeList() {
    this.congeService.geByUser(this.UserIdConnected).subscribe(res => {
      this.filtredCongeList = res
    })
  }

  //Edit Administration
  congeId: number;
  onSubmit(form: NgForm) { 
    this.updateRecord(form)
  }

  conge: PermissionU = new PermissionU();
  date = new Date().toLocaleDateString();
  updateRecord(form: NgForm) {

    if (this.congeService.formData.etat == "???? ????????????????") {
      this.congeService.Edit().subscribe(res => {
        this.toastr.success('???? ?????????????? ??????????', '????????')
        this.resetForm();
        this.CongeList();
      },
        err => {
          this.toastr.error('???? ?????? ??????????????  ', ' ??????');
        }


      )
    } if (this.congeService.formData.etat == '??????????') {
      this.toastr.error('?????? ?????? ???????????????? ?????? ?????? ??????????', ' ???? ?????? ??????????????');
    } if (this.congeService.formData.etat == '??????') {
      this.toastr.error('?????? ???? ?????? ?????? ??????????', ' ???? ?????? ??????????????');
    }
  }


  populateForm(conge: PermissionU) {
    this.congeService.formData = Object.assign({}, conge)
    this.congeId = conge.id
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      date: '',
      type: '',
      autre: '',
      heuredeb: '',
      heurefin: '',
      raison: '',
      etat: '',
      etatdir: '',
      etatrh: '',
      iddir: '',
      idrh: '',
      nomrh: '',
      nomdir: '',
      datedir: '',
      daterh: '',
      creatorName: '',
      datenereg: '',
      attibut1: '',
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      idUserCreator: '',

    }
  }
}
