import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import { OptionalSyncTronscanItemProps, SyncTronscanSaveData } from '../../common/types';
import type Mithril from 'mithril';

/**
 * Modal component for adding or editing SyncTronscan items
 */
export default class SyncTronscanAddModal extends Modal<OptionalSyncTronscanItemProps> {
  static isDismissible = false;

  private settingType: 'add' | 'edit' = 'add';
  private loading: boolean = false;
  private itemName: Stream<string>;
  private itemDesc: Stream<string>;
  private itemUrl: Stream<string>;
  private itemImage: Stream<string>;

  oninit(vnode: Mithril.Vnode<OptionalSyncTronscanItemProps>) {
    super.oninit(vnode);
    
    const { syncTronscanItemData } = this.attrs;
    
    if (syncTronscanItemData) {
      this.settingType = 'edit';
      this.itemName = Stream(syncTronscanItemData.name());
      this.itemDesc = Stream(syncTronscanItemData.desc());
      this.itemUrl = Stream(syncTronscanItemData.url());
      this.itemImage = Stream(syncTronscanItemData.img());
    } else {
      this.settingType = 'add';
      this.itemName = Stream('');
      this.itemUrl = Stream('');
      this.itemImage = Stream('');
      this.itemDesc = Stream('');
    }
  }

  className(): string {
    return 'Modal--Medium';
  }

  title(): string {
    return this.settingType === 'add'
      ? app.translator.trans('wusong8899-links-queue.admin.settings.item-add')
      : app.translator.trans('wusong8899-links-queue.admin.settings.item-edit');
  }

  content(): Mithril.Children {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">
            <div>
              <div className="SyncTronscanSettingsLabel">
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-name')}
              </div>
              <input 
                maxlength="255" 
                required 
                className="FormControl" 
                bidi={this.itemName} 
              />
              
              <div className="SyncTronscanSettingsLabel">
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-url')}
              </div>
              {this.settingType === 'add' && (
                <input 
                  maxlength="500" 
                  required 
                  className="FormControl" 
                  bidi={this.itemUrl} 
                />
              )}
              {this.settingType === 'edit' && (
                <input 
                  disabled 
                  maxlength="500" 
                  required 
                  className="FormControl" 
                  bidi={this.itemUrl} 
                />
              )}

              <div className="SyncTronscanSettingsLabel">
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-img')}
              </div>
              <input 
                maxlength="500" 
                required 
                className="FormControl" 
                bidi={this.itemImage} 
              />
            </div>
          </div>

          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              this.settingType === 'add'
                ? app.translator.trans('wusong8899-sync-tronscan.admin.link-add')
                : app.translator.trans('wusong8899-sync-tronscan.admin.save')
            )}&nbsp;
            {Button.component(
              {
                className: 'Button syncTronscanButton--gray',
                loading: this.loading,
                onclick: () => {
                  this.hide();
                }
              },
              app.translator.trans('wusong8899-sync-tronscan.admin.cancel')
            )}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e: Event): void {
    e.preventDefault();

    this.loading = true;

    if (this.settingType === 'edit' && this.attrs.syncTronscanItemData) {
      const saveData: Partial<SyncTronscanSaveData> = {
        name: this.itemName(),
        img: this.itemImage(),
        desc: this.itemDesc()
      };

      this.attrs.syncTronscanItemData.save(saveData)
        .then(() => {
          this.hide();
        })
        .catch((response: any) => {
          this.loading = false;
          this.handleErrors(response);
        });
    } else {
      const saveData: SyncTronscanSaveData = {
        name: this.itemName(),
        url: this.itemUrl(),
        img: this.itemImage(),
        desc: this.itemDesc()
      };

      app.store
        .createRecord('syncTronscanList')
        .save(saveData)
        .then(() => {
          location.reload();
        })
        .catch((error: any) => {
          this.loading = false;
          this.handleErrors(error);
        });
    }
  }
}
