import { Component } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Occasion } from './occasion';
import { Observable } from 'rxjs';
import { OccasionService } from '../../_services/occasion.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';



@Component({
  selector: 'occasion-list',
  templateUrl: './occasion-list.component.html',
  styleUrls: ['./occasion-list.component.css'],
  providers: [OccasionService]

})


export class OccasionListComponent {

  
  occasions: Occasion[];
  selectedOccasion: Occasion;
  communicat = "";
  cheapest = 0;
  seatsTaken = 0;
  minPrice = 10000000;
  maxPrice = 0;
  currentUser: any;
  isLoggedIn;
  showModeratorBoard;
  roles;
  username;
  comments = {};
  user;
  now=new Date().getTime();


  namesCheckboxLabels = [];
  filteredNames = [];
  destinationsCheckboxLabels = [];
  filteredDestinations = [];
  filteredMaxPrice = 1000;
  filteredMinPrice = 0;
  filteredMaxArrivalDate = new Date("2022-01-16").getTime();
  filteredMinDepartureDate = new Date("2000-01-16").getTime();

  constructor(private occasionService: OccasionService, private fb: FormBuilder, private tokenStorageService: TokenStorageService) {
    this.getOccasions();
  }
  getOccasions(): void {
    this.occasionService.getOccasions()
      .subscribe(occasions => {
        this.get_maxPrice(occasions);
        this.get_minPrice(occasions);
        this.occasions = [];
        this.occasions = occasions
        this.names.controls=[];
        for (var i = 0; i < occasions.length; i++) {
          if (!this.namesCheckboxLabels.includes(occasions[i].title)) {
            this.namesCheckboxLabels.push(occasions[i].title)
            this.names.push(this.fb.control(true))
            this.occasions[i].start_date = new Date(this.occasions[i].start_date).getTime();
            this.occasions[i].end_date = new Date(this.occasions[i].end_date).getTime();
            
          }
         
          this.occasionService.getComments(occasions[i]._id)
            .subscribe(comments => { if (comments[0]) this.comments[comments[0].occasionId] = comments })

        }
      });
  }

  optionsPriceSlider: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  optionsDateSlider: Options = {
    floor: new Date().getTime(),
    ceil: new Date("2021-10-01").getTime(),
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Start date:</b>' + new Date(value).toLocaleDateString("en-US");
        case LabelType.High:
          return '<b>End date:</b>' + new Date(value).toLocaleDateString("en-US");
        default:
          return '$' + value;
      }
    }
  };

  optionsRateSlider: Options = {
    floor: 0,
    ceil: 5,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Minimum rate:</b>' + value;
        case LabelType.High:
          return '<b>Maximum rate:</b>' + value;
        default:
          return "" + value;
      }
    }
  };

  filters = this.fb.group({
    names: this.fb.array([]),
    destinations: this.fb.array([]),
    price: new FormControl([0, 1000]),
    date: new FormControl([new Date().getTime(), new Date("2022-01-16").getTime()]),
    rate: new FormControl([0, 5])
  })



  ngAfterViewInit() {
    let o: Observable<boolean> = this.names.valueChanges;
    o.subscribe(v => {
      this.filteredNames = []
      for (let n in this.namesCheckboxLabels) {
        if (v[n])
          this.filteredNames.push(this.namesCheckboxLabels[n])
      }
    });
    let d: Observable<boolean> = this.destinations.valueChanges;
    d.subscribe(v => {
      this.filteredDestinations = []
      for (let n in this.namesCheckboxLabels) {
        if (v[n])
          this.filteredDestinations.push(this.destinationsCheckboxLabels[n])
      }
    });
    let p: Observable<boolean> = this.price.valueChanges;
    p.subscribe(v => {
      this.filteredMaxPrice = v[1]
      this.filteredMinPrice = v[0]
    });
    let dt: Observable<boolean> = this.date.valueChanges;
    dt.subscribe(v => {
      this.filteredMaxArrivalDate = v[1]
      this.filteredMinDepartureDate = v[0]
    });
  }

  get names() {
    return this.filters.get('names') as FormArray;
  }
  get destinations() {
    return this.filters.get('destinations') as FormArray;
  }
  get price() {
    return this.filters.get('price') as FormArray;
  }
  get date() {
    return this.filters.get('date') as FormArray;
  }
  get rate() {
    return this.filters.get('rate') as FormArray;
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
      this.roles = user.roles;
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.user = user;

    }
  }

  commentsForm = this.fb.group({
    text: "",
    rate: 5
  });

  addComment(occasion) {
    let comment = {
      text: this.commentsForm.value.text,
      rate: this.commentsForm.value.rate,
      username: this.username,
      occasionId: occasion._id
    };
    this.occasionService.addComment(occasion._id, JSON.stringify(comment)).subscribe(response => { });
    this.occasionService.getComments(occasion._id)
      .subscribe(comments => { if (comments[0]) this.comments[comments[0].occasionId] = comments })
    this.commentsForm.value.text = "";
    this.commentsForm.value.rate = "";

  }
 
  deleteOccasion(occasion) {
    console.log("deleteOccasion Parent")
    this.getOccasions()
  }
  get_minPrice(occasions: Occasion[]) {
    for (var i = 0; i < occasions.length; i++) {
      if (occasions[i].price < this.minPrice) {
        this.minPrice = occasions[i].price
      }
    }
  }
  get_maxPrice(occasions: Occasion[]) {
    for (var i = 0; i < occasions.length; i++) {
      if (occasions[i].price > this.maxPrice) {
        this.maxPrice = occasions[i].price
      }
    }
  }
 
  
}

