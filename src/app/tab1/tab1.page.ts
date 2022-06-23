import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import * as Enums from '../enums/enums';
@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {
    nomPrenom: any;
    tel1: any;
    tel2: any;
    sexe: any;
    email: any;
    cni: any;
    residence: any;
    profession: any;
    noRepertoire: any;
    nbreContact: any;
    document: any;
    operateur: any;
    apparence: any;
    zones: any;
    detail: any;
    point: any;
    mode: any;
    releveurId: any;
    recommendation = '';
    addRecommendation = '';
    user = '';

    nom: any;
    tel: any;
    constructor(private platform: Platform, private httpClient: HttpClient, public alertController: AlertController,
                public loading: LoadingController, private toastController: ToastController,
                private navCtrl: NavController, public actionSheetController: ActionSheetController) {
    }

    ngOnInit() {
        this.user = 'user';
        this.recommendation = '';
        this.addRecommendation = '';

    }

    async saveUser() {
        const body = {
        nomPrenom: this.nomPrenom,
        tel1: this.tel1,
        tel2: this.tel2,
        sexe: this.sexe,
        email: this.email,
        cni: this.cni,
        residence: this.residence,
        profession: this.profession,
        noRepertoire: this.noRepertoire,
        nbreContact: this.nbreContact,
        document: this.document,
        operateur: this.operateur,
        apparence: this.apparence,
        zones: this.zones,
        detail: this.detail,
        point: this.point,
        mode: this.mode,
        releveurId: localStorage.getItem('releveur_id'),
        };
        const loadingElement = await this.loading.create({
            message: 'Please wait...',
            spinner: 'crescent'
        });
        loadingElement.present().then(() => {// habitechsolution.com
            console.log(body);
            this.httpClient.post(Enums.APIURL.URL1 + '/' + 'insertUtilisateurs.php', body).subscribe(res => {
                loadingElement.dismiss();
                // {"success":true,"idadd":"3"} JSON.stringify(this.items)
                console.log(res['success']);
                if (res['success'] === true) {
                    /*window.localStorage.setItem('authenticated', 'true');
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    */
                    window.localStorage.setItem('utilisateurs_id', res['idadd']);
                    this.presentToast('Utilisateur sauvegardé!!!');
                    this.user = '';
                    this.recommendation = 'recommendation';
                    this.addRecommendation = '';
                    // this.navCtrl.navigateRoot('/tabs');
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

    addRecommandation() {
        this.user = '';
        this.recommendation = '';
        this.addRecommendation = 'addRecommendation';
    }

    async ajout() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Add recommendation',
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



    async saveRecommandation() {
        const body = {
            nom: this.nom,
            tel: this.tel,
            sexe: this.sexe,
            email: this.email,
            utilisateurs_id: localStorage.getItem('utilisateurs_id'),
        };
        const loadingElement = await this.loading.create({
            message: 'Please wait...',
            spinner: 'crescent'
        });
        loadingElement.present().then(() => {// habitechsolution.com
            console.log(body);
            this.httpClient.post(Enums.APIURL.URL1 + '/' + 'insertRecommendation.php', body).subscribe(res => {
                loadingElement.dismiss();
                // {"success":true,"idadd":"3"} JSON.stringify(this.items)
                console.log(res['success']);
                if (res['success'] === true) {
                    /*window.localStorage.setItem('authenticated', 'true');
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    */
                    window.localStorage.setItem('recommendation_id', res['idadd']);
                    this.presentToast('recommendation save!!!');
                    this.user = 'user';
                    this.recommendation = '';
                    this.addRecommendation = '';
                    this.navCtrl.navigateRoot('/tabs');
                    console.log(res);
                }

            });
        });

    }

    logOut() {
        window.localStorage.setItem('authenticated', 'false');
        this.presentToast('vous êtes déconnectez!!!');
        this.navCtrl.navigateRoot('/home');
    }
}
