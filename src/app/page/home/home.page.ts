import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import * as Enums from '../../enums/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  login: any;
  password: any;
  gender: any;
  private msg: any;
  constructor(private platform: Platform, private httpClient: HttpClient, public alertController: AlertController,
              public loading: LoadingController, private toastController: ToastController,
              private navCtrl: NavController, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

    forgotPass() {

    }

  async signIn() {
    const body = {
      login: this.login,
      password: this.password,
    };
    const loadingElement = await this.loading.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });
    loadingElement.present().then(() => {// habitechsolution.com https://labred237.com/Test/login.php  http://app-cd07bfac-d214-4629-839d-f82d5f671b67.cleverapps.io/login.php
      this.httpClient.post(Enums.APIURL.URL1 + '/' + 'login.php', body).subscribe(res => {
        loadingElement.dismiss();
        console.log(res['success']);
        if (res['success'] === true) {
          window.localStorage.setItem('authenticated', 'true');
          window.localStorage.setItem('releveur_id', res['idadd']);
          this.navCtrl.navigateRoot('/tabs');
          console.log(res);
        }

      });
    });

  }


  signUp() {
    this.navCtrl.navigateRoot('/register');
  }


  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choice Media',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          // this.openCamera();
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          console.log('Gallery clicked');
          // this.openGallery();
        }


      }]
    });
    await actionSheet.present();
  }
}
