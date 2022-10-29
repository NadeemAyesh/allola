import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  @Input() item: any;
  categories: any = [];
  isModalOpen = false;

  constructor(private general: GeneralService, private alertController: AlertController) { }

  ngOnInit() {}

  async deleteItem() {
    const alert = await this.alertController.create({
      header: 'هل تريد حذف هذا العنصر؟',
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
            this.general.deleteItem(this.item.id).subscribe((data: any) => {
              if(data.code === 1) {
                this.general.$itemDeleted.emit(data);
              }
            });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  cancel() {
    this.isModalOpen = !this.isModalOpen;
    this.modal.dismiss(null, 'cancel');
  }

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;

  }
}
