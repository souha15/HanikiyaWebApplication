import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Conge } from '../../shared/Models/RH/conge.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-dem-conge-nouveau-ne',
  templateUrl: './dem-conge-nouveau-ne.component.html',
  styleUrls: ['./dem-conge-nouveau-ne.component.css']
})
export class DemCongeNouveauNeComponent implements OnInit {

  constructor(private congeService: CongeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.UserList();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  userc: UserDetail = new UserDetail();
  notif: Notif = new Notif();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      if (res.attribut1 != null) {
        this.conge.directeurnom = res.directeur;
        this.conge.directeurid = res.attribut1;
        this.notif.userReceiverId = res.attribut1;
        this.notif.userReceiverName = res.directeur;
      }
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "?????? ?????????? ?????????? ???????? ???? ???????????? " + res.fullName
      this.notif.readUnread = "0";
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;

    })

  }

  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }

  //get Rempla??ant Name

  getRemplacant(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.conge.nomremplacant = res.fullName

    })
  }


  //date fin
  datef;
  cdates: boolean = false;
  tdatefin(event) {
    this.datef = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0

    } else {
      this.cdates = false;
      if (this.dated == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }


  }

  //date debut
  dated;
  tdatedebut(event) {
    this.dated = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0

    } else {
      this.cdates = false;
      if (this.datef == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }
  }

  //Difference
  diffDays: number = 0;
  testdays: boolean = false;
  diff() {
    let newDated = new Date(this.dated)
    let newDatef = new Date(this.datef);
    var diff = Math.abs(newDated.getTime() - newDatef.getTime());
    this.diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    this.conge.duree = this.diffDays.toString();
    if (this.diffDays <= 3) {
      this.testdays = true;
    } else {
      this.testdays = false;
    }

  }

  testdates: string;
  comparedates() {
    let d1 = new Date(this.dated);
    let d2 = new Date(this.datef);
    if (d1.getTime() < d2.getTime()) {
      this.testdates = "good"
    } else if (d1.getTime() > d2.getTime()) {
      this.testdates = "bad"
    } else {
      this.testdates = "equal"
    }
  }


  //Conge Submit
  conge: Conge = new Conge();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.conge.dateenreg = this.date;
    this.conge.etat = "5%";
    this.conge.etatd = "???? ????????????????";
    this.conge.etatrh = "???? ????????????????";
    this.conge.attribut2 = "???? ????????????????";
    this.conge.type = "?????????? ?????????? ????????"
    this.conge.attribut6 = "???? ????????????????";
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true

      if (this.testdays) {
        this.congeService.Add(this.conge).subscribe(
          res => {
            this.notif.serviceId = res.id;
            this.notif.serviceName = "?????? ??????????"
            this.notifService.Add(this.notif).subscribe(res => {

            this.diffDays = 0
            this.toastr.success(" ???? ?????????? ?????????? ??????????", "????????");
            form.resetForm();
            })
          },
          err => {
            this.toastr.error("???? ?????? ?????????? ??????????", "?????? ")
            this.diffDays = 0
          })


      } else {
        this.toastr.error("???? ?????????? ?????????? 5 ????????", "?????? ")
      }
    }



  }
}
