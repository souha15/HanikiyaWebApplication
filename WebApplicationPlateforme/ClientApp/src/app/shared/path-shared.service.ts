import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathSharedService {

  constructor() { }

  getPath() {
//return  'http://161.97.163.78:82/api'
return  'http://161.97.163.78:88/api'
//  return 'http://localhost:49599/api'
 // return 'http://161.97.163.78:84/api'
 //  return 'http://173.212.215.254:80/api'


  }
}
