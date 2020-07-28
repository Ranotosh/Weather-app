import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CityWeatherService {

    data: any;

    constructor(private _httpclient: HttpClient) { }

    getCityWeather(value) {
        const token = 'ab1f9e7f91651c4aad84f69d28fc8f9c';
        return this._httpclient.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${token}`)
    }

    setData(name,data){
        this.data= localStorage.setItem(name,JSON.stringify(data))
       }
     getData(data) {
        return JSON.parse(localStorage.getItem(data));
      }
}