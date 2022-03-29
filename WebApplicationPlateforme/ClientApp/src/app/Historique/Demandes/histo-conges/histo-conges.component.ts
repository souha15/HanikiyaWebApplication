import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-conges',
  templateUrl: './histo-conges.component.html',
  styleUrls: ['./histo-conges.component.css']
})
export class HistoCongesComponent implements OnInit {

  constructor(private congeService: CongeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CongeList();
    this.resetForm();
  }

  p: Number = 1;
  count: Number = 5;

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  filtredCongeList2: Conge[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
      //this.filtredCongeList = this.filtredCongeList2.filter(item => item.attribut6 == "إعتماد بخصم" || item.attribut6 =="إعتماد بغير خصم")
    })
  }


  per: Conge = new Conge();
  val: string;
  test0: boolean = false;
  test25: boolean = false;
  test50: boolean = false;
  test70: boolean = false;
  test100: boolean = false;
  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
    console.log(this.per)
    if (this.per.etatd == 'في الانتظار') {
      this.val = '0%'
      this.test0 = true;
      this.test100 = false;
      this.test25 = false;
      this.test50 = false;
      this.test70 = false;
    } else if (this.per.attribut2 == 'موافق') {
      this.test100 = true;
      this.test0 = false;
      this.test25 = false;
      this.test50 = false;
      this.test70 = false;
    } else
      this.val = this.per.etat;
      if (this.val == "25%") {
        this.test25 = true;
        this.test100 = false;
        this.test0 = false;
        this.test50 = false;
        this.test70 = false;
      }

      if (this.val == "50%") {
        this.test50 = true;
        this.test100 = false;
        this.test0 = false;
        this.test25 = false;
        this.test70 = false;
      }

    if (this.val == "70%") {
      this.test70 = true;
      this.test100 = false;
      this.test0 = false;
      this.test25 = false;
      this.test50 = false;

      }  
   
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  conge: Conge = new Conge();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.dated = this.date;
    this.congeService.formData.etat = "100%";
    this.congeService.Edit().subscribe(res => {
     
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.CongeList();

    
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      })
  }



  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      transferera: '',
      transfereretab: '',
      transfertrh: '',
      transfertdeux: '',
      datetransfert: '',
      idtrh: '',
      idtetab: '',
      nomtrh: '',
      nomtetab: '',
      etatetab: '',
      dateetab: '',
      tran1: '',
      tran2: '',
      tran3: '',
      tran4: '',
      tran5: '',
      tran6: '',
      datedebut: '',
      datefin: '',
      duree: '',
      tel: '',
      type: '',
      adr: '',
      idremplacant: '',
      nomremplacant: '',
      etat: '',
      etatd: '',
      etatrh: '',
      directeurid: '',
      directeurnom: '',
      rhid: '',
      rhnom: '',
      dated: '',
      daterh: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }
}
