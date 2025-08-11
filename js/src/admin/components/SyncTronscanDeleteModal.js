import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class SyncTronscanDeleteModal extends Modal {
  static isDismissible = false;

  oninit(vnode) {
    super.oninit(vnode);
    this.syncTronscanItemData = this.attrs.syncTronscanItemData;
    this.loading = false;
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('wusong8899-links-queue.admin.settings.item-delete-confirmation');
  }

  content() {
    //

    return (
      <div className="Modal-body">
        <div className="Form-group" style="text-align: center;">
          {Button.component(
            {
              className: 'Button Button--primary',
              type: 'submit',
              loading: this.loading,
            },
            app.translator.trans('wusong8899-links-queue.admin.confirm')
          )}&nbsp;
          {Button.component(
            {
              className: 'Button guagualeButton--gray',
              loading: this.loading,
              onclick: () => {
                this.hide();
              }
            },
            app.translator.trans('wusong8899-links-queue.admin.cancel')
          )}
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    this.syncTronscanItemData.delete()
    .then(
      (response) => {
        location.reload();
      }
    );
  }
}
