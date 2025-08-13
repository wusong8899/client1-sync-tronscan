import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { SyncTronscanItemProps } from '../../common/types';
import type Mithril from 'mithril';

/**
 * Modal component for confirming deletion of SyncTronscan items
 */
export default class SyncTronscanDeleteModal extends Modal<SyncTronscanItemProps> {
  static isDismissible = false;

  private loading: boolean = false;

  oninit(vnode: Mithril.Vnode<SyncTronscanItemProps>) {
    super.oninit(vnode);
    this.loading = false;
  }

  className(): string {
    return 'Modal--small';
  }

  title(): string {
    return app.translator.trans('wusong8899-links-queue.admin.settings.item-delete-confirmation');
  }

  content(): Mithril.Children {
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

  onsubmit(e: Event): void {
    e.preventDefault();

    this.loading = true;

    this.attrs.syncTronscanItemData.delete()
      .then(() => {
        location.reload();
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
