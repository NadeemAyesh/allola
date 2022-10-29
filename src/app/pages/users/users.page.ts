import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { SimpleModalPage } from 'src/app/modals/simple-modal/simple-modal.page';
import { USER } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  showLoader = false;
  userList: USER[] = [];
  page = 1;
  currentPage = 1;
  lastPage = 1;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  isModalOpen = false;

  currentUser: USER;

  constructor(private modalCtrl: ModalController, private general: GeneralService, private alertController: AlertController) {
    this.general.$userAdded.subscribe(data => {
      this.getUsers();
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  showLoaderClick() {
    // this.showLoader = true;
    if(this.lastPage !== this.currentPage) {
      this.getUsers(this.currentPage+=1);
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SimpleModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }

  getUsers(page?: number) {
    this.showLoader = true;
    this.general.getUsers(page ?? page).subscribe((data: any) => {
      console.log(data);
      if(data.code === 1) {
        this.userList = data.data.data;
      }
      this.showLoader = false;
      this.currentPage = data.data.current_page;
      this.lastPage = data.data.last_page;
    }, err => {
      this.showLoader = false;
    });
  }

  async deleteUser(id: number) {
    const alert = await this.alertController.create({
      header: 'هل تريد حذف هذا المستخدم؟',
      buttons: [
        {
          text: 'إلغاء',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'تأكيد الحذف',
          role: 'confirm',
          handler: () => {
            this.general.deleteUser(id).subscribe((data: any) => {
              if(data.code === 1) {
                this.getUsers();
              }
            });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  editUser(id: number) {

  }

  handleRefresh(event) {
    setTimeout(() => {
      this.getUsers();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = !this.isModalOpen;
  }

  setOpen(isOpen: boolean, id: number) {
    // currentUser
    this.general.showUser(id).subscribe((data: any) => {
      if(data.code === 1) {
        this.currentUser = data.data;
        this.isModalOpen = isOpen;
      }
    });

  }

}
