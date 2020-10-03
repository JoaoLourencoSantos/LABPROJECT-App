import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: any = [];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.populate();
  }

  populate() {
    this.entryService.findAll().subscribe((result) => {
      if (result) {
        console.log(result);

        this.list = result.body;
      }
    });
  }
}
