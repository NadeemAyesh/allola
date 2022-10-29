import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AddItemPage } from 'src/app/modals/add-item/add-item.page';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  showLoader = false;
  itemsList: any;
  page = 1;
  currentPage = 1;
  lastPage = 1;
  categories: any = [];
  slideOpts = {
    initialSlide: 3.2,
    speed: 400,
    dots: false
  };

  constructor(private general: GeneralService,  private loadingCtrl: LoadingController, private modalCtrl: ModalController) {
    this.general.$itemAdded.subscribe((data) => {
      this.getItems();
    });

    this.general.$itemDeleted.subscribe((data) => {
      this.getItems();
    });
  }

  ngOnInit() {
    this.getItems();
    this.getCategories();
  }

  async getItems(page?: number) {
    const loading = await this.loadingCtrl.create({
      message: '',
    });
    loading.present();
    this.general.getItems(page ?? page).subscribe((data: any) => {
      if(data.code === 1) {
        this.itemsList = data.data.data;
      }
      this.showLoader = false;
      this.currentPage = data.data.current_page;
      this.lastPage = data.data.last_page;
      loading.dismiss();
    }, err => {
      this.showLoader = false;
      loading.dismiss();
    });
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddItemPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }

  cancel(modalContebt: any) {
    modalContebt.dismiss(null, 'cancel');
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.getItems();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  showLoaderClick() {
    // this.showLoader = true;
    if(this.lastPage !== this.currentPage) {
      this.getItems(this.currentPage+=1);
    }
  }

  getCategories() {
    this.general.getCategories().subscribe((data: any) => {
      if(data.code === 1) {
        this.categories = data.data;
      }
    });
  }

}
