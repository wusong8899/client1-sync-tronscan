import Component from "flarum/Component";
import Button from 'flarum/components/Button';
import SyncTronscanAddModal from './SyncTronscanAddModal';
import SyncTronscanDeleteModal from './SyncTronscanDeleteModal';

export default class SyncTronscanListItem extends Component {

  oninit(vnode) {
    super.oninit(vnode);
    this.loading = false;
  }

  view() {
    const {syncTronscanItemData} = this.attrs;
    const linkID = syncTronscanItemData.id();
    const linkName = syncTronscanItemData.name();
    const linkDesc = syncTronscanItemData.desc();
    const linkUrl = syncTronscanItemData.url();
    const linkImage = syncTronscanItemData.img();
    const linkSort = syncTronscanItemData.sort();
    const valueUsd = syncTronscanItemData.valueUsd();
    const updateTime = syncTronscanItemData.updateTime();
    const addButtonID = "syncTronscanAddButton"+linkID;
    const deleteButtonID = "syncTronscanDeleteButton"+linkID;

    return (
      <div style="border: 1px dotted var(--control-color);padding: 10px;border-radius: 4px;min-height: 152px;">
        <div>
          <img style="width: 100px;height:130px;border-radius: 12px;float:right" src={linkImage} />
          <div style="padding-top: 5px;word-break: break-all;">
            <div style="padding-bottom:10px;">
              <Button id={addButtonID} className={'Button Button--primary'} onclick={() => this.editItem(syncTronscanItemData)}>
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-edit')}
              </Button>
              &nbsp;
              <Button loading={this.loading} className={'Button Button--primary'} onclick={() => this.refreshItem(syncTronscanItemData,linkID)}>
                {app.translator.trans('wusong8899-sync-tronscan.admin.settings.item-refresh')}
              </Button>
              &nbsp;
              <Button id={deleteButtonID} style="font-weight:bold;width:66px;" className={'Button Button--danger'} onclick={() => this.deleteItem(syncTronscanItemData)}>
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

  refreshItem(syncTronscanItemData,linkID){
    $('#syncTronscanAddButton'+linkID).prop('disabled', true);
    $('#syncTronscanDeleteButton'+linkID).prop('disabled', true);
    this.loading = true;

    app.request({
      url: `${app.forum.attribute('apiUrl')}/syncTronscanValueUsd`,
      method: 'POST',
      body: {linkID},
    })
    .then(
      (payload) => {
        $('#syncTronscanAddButton'+linkID).prop('disabled', false);
        $('#syncTronscanDeleteButton'+linkID).prop('disabled', false);
        this.loading = false;
        app.store.pushPayload(payload);
        m.redraw();
        console.log(payload);
      }
    )
  }

  editItem(syncTronscanItemData) {
    app.modal.show(SyncTronscanAddModal, {syncTronscanItemData})
  }

  deleteItem(syncTronscanItemData) {
    app.modal.show(SyncTronscanDeleteModal, {syncTronscanItemData})
  }
}
