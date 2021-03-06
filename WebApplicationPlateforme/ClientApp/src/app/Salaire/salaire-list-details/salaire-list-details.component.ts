import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SalaireDService } from '../../shared/Services/Salaire/salaire-d.service';
import { SalaireD } from '../../shared/Models/Salaire/salaire-d.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-salaire-list-details',
  templateUrl: './salaire-list-details.component.html',
  styleUrls: ['./salaire-list-details.component.css']
})
export class SalaireListDetailsComponent implements OnInit {

  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private salaireService: SalaireDService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  filter;
  ngOnInit(): void {
    this.getIdUrl();
    this.getList();
    this.getUserConnected();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR" || item == "SECRETAIRE") {
            this.testrole = true;
          } else this.testrole = false
        })
        console.log(this.testrole)
      })
    })

  }

  //get the id in Url

  mois: string;
  month: number;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.mois = params['mois']
      if (this.mois == "??????????") {
        this.month = 1
      }

      if (this.mois == "????????????") {
        this.month =2
      }

      if (this.mois == "????????") {
        this.month =3
      }

      if (this.mois == "??????????") {
        this.month =4
      }

      if (this.mois == "????????") {
        this.month =5
      }

      if (this.mois == "??????????") {
        this.month =6
      }

      if (this.mois == "??????????") {
        this.month =7
      }

      if (this.mois == "??????????") {
        this.month =8
      }


      if (this.mois == "????????????") {
        this.month =9
      }


      if (this.mois == "????????????") {
        this.month =10
      }

      if (this.mois == "????????????") {
        this.month =11
      }

      if (this.mois == "????????????") {
        this.month =12
      }


    });


  }


  p: Number = 1;
  count: Number = 5;
  compareDate(date1) {
    var date = new Date(date1);
    var mois = date.getMonth() + 1;
    return mois;
  }
  list: SalaireD[] = [];
  listG: SalaireD[] = [];
  getList() {

    this.salaireService.Get().subscribe(res => {
      this.list = res
      this.listG = this.list.filter(item => this.compareDate(item.mois) == this.month)
    })
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.salaireService.Delete(Id)
        .subscribe(res => {
          this.getList();
          this.toastr.success("???? ??????????  ??????????", "????????");
        },

          err => {
            console.log(err);
            this.toastr.warning('???? ?????? ??????????  ', ' ??????');

          }
        )

    }
  }
  path: string;
  public print() {

    var data = document.getElementById('htmlData');
    // data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      // data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Salary" + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }
}
