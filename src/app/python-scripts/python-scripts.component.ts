import { Component, OnInit } from '@angular/core';
import {PythonScriptsService} from "./python-scripts.service";
import {HttpClient} from "@angular/common/http";




@Component({
  selector: 'bg-python-scripts',
  templateUrl: './python-scripts.component.html',
  styleUrls: ['./python-scripts.component.scss']
})
export class PythonScriptsComponent implements OnInit {

    data: any;
    start: string;
    private req: any;
    url = '/output/';


  constructor(private http: HttpClient, private pythonScriptsService: PythonScriptsService) { }

    ngOnInit(): void {
        this.pythonScriptsService.getPythonScripts().subscribe(data => {
                this.start = JSON.stringify(data);
                console.log("--this.start = JSON.stringify(data): ", this.start)
        });

        this.req = this.http.get(this.url).subscribe(response => {
            this.data = response as [any];
            console.log("--this.data = response as [any]: ", this.data)
        });
    }

    ngOnDestroy() {
        this.req.unsubscribe();
    }

}
