import { Component, OnInit } from '@angular/core';
import { CityWeatherService } from './weather.service';
declare var $: any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData: any;
  weatherImage: any;
  temp: any;
  sunrise: any;
  sunset: any;
  toggle: boolean = false;
  showCard: any = [];
  cardTemp: any = [];
  cardSunrise: any = [];
  cardSunset: any = [];
  searchBoxText:any;
  buttonChanges:boolean=false;
  constructor(private _cityWeatherService: CityWeatherService) { }

  ngOnInit() {
    this.getCityData();
  }

  getCityData(){
    if (this._cityWeatherService.getData('card')) {
      this.showCard = this._cityWeatherService.getData('card');
      if(this.showCard.length>0){
        this.toggle = true;
      }
      else{
        this.toggle=false;
      }
    }
    else {
      this.toggle = false;
    }
  }

  searchCity(value) {
    this._cityWeatherService.getCityWeather(value).subscribe(res => {
      if (res.weather) {
        this.weatherData = res;
        this.weatherData.main.temp = Number(res.main.temp - 273).toFixed(1);
        this.weatherData.sys.sunrise = new Date(res.sys.sunrise).toISOString().slice(11, 16);
        this.weatherData.sys.sunset = new Date(res.sys.sunset).toISOString().slice(11, 16);
        this.weatherImage = 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png';
        this.weatherData['image'] = this.weatherImage;
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        this.weatherData['date']=d.getDate()+' '+ monthNames[d.getMonth()]+' '+d.getFullYear();
        $('#weatherResponse').modal('show');
      }

    }
      , error => {
        this.weatherData = error;
        if (error.status) {
          $('#weatherResponse').modal('show');
        }
      }
    )
  }
  closeResponseModal() {
    this.searchBoxText='';
    $('#weatherResponse').modal('hide');
    this.buttonChanges=false;

  }
  makeCard(value) {
    for(var i=0;i<this.showCard.length;i++){
      if(value.name===this.showCard[i].name){
        $('#weatherResponse').modal('hide');
        this.searchBoxText='';
        return;
      }
    }
    this.showCard.push(value);
    this.searchBoxText='';
    this._cityWeatherService.setData('card', this.showCard);
    this.toggle = true;
    $('#weatherResponse').modal('hide');
  }
  removeCard(value){
    const index=this.showCard.indexOf(value);
    if (index > -1) {
      this.showCard.splice(index, 1);
    }
    this._cityWeatherService.setData('card', this.showCard);
    $('#weatherResponse').modal('hide');
    if(this.showCard.length===0){
      this.toggle=false;
    }
  }

  showModal(index, data) {
    this.buttonChanges=true;
    this.weatherData = data[index];
    $('#weatherResponse').modal('show');
  }
  closeOkayModal(){
    $('#weatherResponse').modal('hide');
  }

}
