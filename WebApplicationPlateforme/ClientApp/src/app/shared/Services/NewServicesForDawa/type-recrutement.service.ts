import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeRecrutementService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Talent 

  AddTalent(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeRecrutements', TbListening, this.headers);
  }

  PutObservableETalent(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeRecrutements/' + Transaction.id, Transaction, this.headers);

  }
  PostTalent() {
    return this.http.post(this.rootURL + '/TypeRecrutements', this.formData, this.headers);
  }


  GetTalent(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeRecrutements');
  }


  GetByIdTalent(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeRecrutements/' + Id);
  }


  EditTalent() {
    return this.http.put(this.rootURL + '/TypeRecrutements/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTalent(id) {
    return this.http.delete(this.rootURL + '/TypeRecrutements/' + id);
  }
}
