import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import SyncTronscanAddModal from './SyncTronscanAddModal';
import SyncTronscanDeleteModal from './SyncTronscanDeleteModal';
import { SyncTronscanItemProps, ValueUsdUpdateRequest } from '../../common/types';
import type Mithril from 'mithril';

/**
 * Component for displaying individual SyncTronscan list items in the admin interface
 */
export default class SyncTronscanListItem extends Component<SyncTronscanItemProps> {
  private loading: boolean = false;
  private addButtonRef: HTMLElement | null = null;
  private deleteButtonRef: HTMLElement | null = null;

  oninit(vnode: Mithril.Vnode<SyncTronscanItemProps>) {
    super.oninit(vnode);
    this.loading = false;
  }

  view(): Mithril.Children {
    const { syncTronscanItemData } = this.attrs;
    const linkID = syncTronscanItemData.id();
    const linkName = syncTronscanItemData.name();
    const linkUrl = syncTronscanItemData.url();
    const linkImage = syncTronscanItemData.img();
    const valueUsd = syncTronscanItemData.valueUsd();
    const updateTime = syncTronscanItemData.updateTime();

    return (
      <div style="border: 1px dotted var(--control-color);padding: 10px;border-radius: 4px;min-height: 152px;">
        <div>
          <img style="width: 100px;height:130px;border-radius: 12px;float:right" src={linkImage} alt={linkName} />
          <div style="padding-top: 5px;word-break: break-all;">
            <div style="padding-bottom:10px;">
              <Button 
                className={'Button Button--primary'} 
                onclick={() => this.editItem(syncTronscanItemData)}
                oncreate={(vnode: Mithril.VnodeDOM) => {
                  this.addButtonRef = vnode.dom as HTMLElement;
                }}
              >
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-edit')}
              </Button>
              &nbsp;
              <Button 
                loading={this.loading} 
                className={'Button Button--primary'} 
                onclick={() => this.refreshItem(syncTronscanItemData, linkID)}
              >
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-refresh')}
              </Button>
              &nbsp;
              <Button 
                style="font-weight:bold;width:66px;" 
                className={'Button Button--danger'} 
                onclick={() => this.deleteItem(syncTronscanItemData)}
                oncreate={(vnode: Mithril.VnodeDOM) => {
                  this.deleteButtonRef = vnode.dom as HTMLElement;
                }}
              >
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-delete')}
              </Button>&nbsp;&nbsp;
            </div>

            <b>{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-id')}: </b>
            {linkID}&nbsp;|&nbsp;
            <b>{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-update-time')}: </b>
            {updateTime}&nbsp;|&nbsp;
            <b>{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-name')}: </b>
            {linkName}
            <br />
            <b>{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-valueUsd')}: </b>
            {valueUsd}&nbsp;<br />
            <b>{app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-url')}: </b>
            {linkUrl}&nbsp;<br />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Refresh the USD value for a SyncTronscan item
   */
  private refreshItem(syncTronscanItemData: any, linkID: string | number): void {
    // Disable buttons during refresh
    if (this.addButtonRef) {
      (this.addButtonRef as HTMLButtonElement).disabled = true;
    }
    if (this.deleteButtonRef) {
      (this.deleteButtonRef as HTMLButtonElement).disabled = true;
    }
    
    this.loading = true;

    const requestData: ValueUsdUpdateRequest = { linkID };

    app.request({
      url: `${app.forum.attribute('apiUrl')}/syncTronscanValueUsd`,
      method: 'POST',
      body: requestData,
    })
    .then((payload: any) => {
      // Re-enable buttons
      if (this.addButtonRef) {
        (this.addButtonRef as HTMLButtonElement).disabled = false;
      }
      if (this.deleteButtonRef) {
        (this.deleteButtonRef as HTMLButtonElement).disabled = false;
      }
      
      this.loading = false;
      app.store.pushPayload(payload);
      m.redraw();
    })
    .catch(() => {
      // Re-enable buttons on error
      if (this.addButtonRef) {
        (this.addButtonRef as HTMLButtonElement).disabled = false;
      }
      if (this.deleteButtonRef) {
        (this.deleteButtonRef as HTMLButtonElement).disabled = false;
      }
      
      this.loading = false;
      m.redraw();
    });
  }

  /**
   * Open the edit modal for a SyncTronscan item
   */
  private editItem(syncTronscanItemData: any): void {
    app.modal.show(SyncTronscanAddModal, { syncTronscanItemData });
  }

  /**
   * Open the delete confirmation modal for a SyncTronscan item
   */
  private deleteItem(syncTronscanItemData: any): void {
    app.modal.show(SyncTronscanDeleteModal, { syncTronscanItemData });
  }
}
