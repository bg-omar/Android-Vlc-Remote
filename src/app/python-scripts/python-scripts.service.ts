import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PythonScriptsService {

    constructor(private http: HttpClient) {
        this.backEndURL = this.getBackEndUrl();
    }

    backEndURL: string;

    getPythonScripts(): Observable<any>  {
        return this.http.get(`${this.backEndURL}/output/`);
    }

    getBackEndUrl(): string {
        return  'http://localhost:5200' ;
    }

}
