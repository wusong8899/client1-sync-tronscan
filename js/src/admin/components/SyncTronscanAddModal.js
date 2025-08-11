import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';

export default class SyncTronscanAddModal extends Modal {
  static isDismissible = false;

  oninit(vnode) {
    super.oninit(vnode);
    this.syncTronscanItemData = this.attrs.syncTronscanItemData;
    this.settingType = "add";

    if(this.syncTronscanItemData){
      this.settingType = "edit";
      this.itemName = Stream(this.syncTronscanItemData.name());
      this.itemDesc = Stream(this.syncTronscanItemData.desc());
      this.itemUrl = Stream(this.syncTronscanItemData.url());
      this.itemImage = Stream(this.syncTronscanItemData.img());
    }else{
      this.itemName = Stream("");
      this.itemUrl = Stream("");
      this.itemImage = Stream("");
      this.itemDesc = Stream("");
    }
  }

  className() {
    return 'Modal--Medium';
  }

  title() {
    return this.settingType==="add"?app.translator.trans('wusong8899-links-queue.admin.settings.item-add'):app.translator.trans('wusong8899-links-queue.admin.settings.item-edit');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">
            <div>
              <div class="SyncTronscanSettingsLabel">{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-name')}</div>
              <input maxlength="255" required className="FormControl" bidi={this.itemName} />
              <div class="SyncTronscanSettingsLabel">{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-url')}</div>

              {this.settingType==="add" && (
                <input maxlength="500" required className="FormControl" bidi={this.itemUrl} />
              )}
              {this.settingType==="edit" && (
                <input disabled maxlength="500" required className="FormControl" bidi={this.itemUrl} />
              )}

              <div class="SyncTronscanSettingsLabel">{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-img')}</div>
              <input maxlength="500" required className="FormControl" bidi={this.itemImage} />
            </div>
          </div>

          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              this.settingType==="add"?app.translator.trans('wusong8899-sync-tronscan.admin.link-add'):app.translator.trans('wusong8899-sync-tronscan.admin.save')
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

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    if(this.settingType==="edit"){
      this.syncTronscanItemData.save({
          name:this.itemName(),
          img:this.itemImage(),
          desc:this.itemDesc()
      })
      .then(
        () => this.hide(),
        (response) => {
          this.loading = false;
          this.handleErrors(response);
        }
      );
    }else{
      app.store
        .createRecord("syncTronscanList")
        .save({
          name:this.itemName(),
          url:this.itemUrl(),
          img:this.itemImage(),
          desc:this.itemDesc()
        })
        .then(
          (syncTronscanList) => {
            location.reload();
          }
        )
        .catch((e) => {
          this.loading = false;
          this.handleErrors(syncTronscanList);
        });
    }
  }
}
