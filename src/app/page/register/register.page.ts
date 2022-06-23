import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import * as Enums from '../../enums/enums';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  login: any;
  password: any;
  gender: any;
  private msg: any;
  constructor(private platform: Platform, private httpClient: HttpClient, public alertController: AlertController,
              public loading: LoadingController, private toastController: ToastController,
              private navCtrl: NavController, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }


  async register() {
    const body = {
      login: this.login,
      password: this.password,
      gender: this.gender,
      aksi: 'add_releveur'
    };
    const loadingElement = await this.loading.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });
    loadingElement.present().then(() => {// habitechsolution.com
      this.httpClient.post(Enums.APIURL.URL1 + '/' +  'insertReleveur.php', body).subscribe(res => {
        loadingElement.dismiss();
         // {"success":true,"idadd":"3"} JSON.stringify(this.items)
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
