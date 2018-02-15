import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController,LoadingController} from 'ionic-angular'

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location  = {
    lat: 13.7251088,
    lng: 100.3529168
  }
  
  constructor(public navCtrl: NavController,
    private geolocation:Geolocation ,
    private loadCtrl:LoadingController,
    private toasCtrl:ToastController,) {}

    ionViewDidLoad(){  
      this.onLocation();
    }

    onLocation(){

      const loader = this.loadCtrl.create({
        content:'Getting your Location...'
      });
      loader.present();
  
      this.geolocation.getCurrentPosition({timeout:15000})
      .then((resp) => {
        // loader.dismiss();
        
        this.location.lat =  resp.coords.latitude
        this.location.lng = resp.coords.longitude
  
        console.log(this.location);
       })
       .catch((error) => {
  
         console.log('Error getting location', error);
         
         loader.dismiss();
         const toast = this.toasCtrl.create({
           message:'ไม่สามารถเชื่อมต่อ GPS กรุณาตรวจสอบการตั้งค่า!',
           duration :5500
         })
         toast.present();
       });
    }

}
