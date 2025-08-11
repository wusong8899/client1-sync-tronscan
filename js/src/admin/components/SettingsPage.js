import ExtensionPage from 'flarum/components/ExtensionPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Button from 'flarum/components/Button';
import SyncTronscanAddModal from './SyncTronscanAddModal';
import SyncTronscanListItem from './SyncTronscanListItem';

import Sortable from 'sortablejs';

export default class SettingsPage extends ExtensionPage {
  oninit(attrs) {
    super.oninit(attrs);
    this.loading = false;
    this.syncTronscanList = [];
    this.loadResults();
  }

  initSort(){
    let el = document.getElementById('linksQueueSortableItems');
    let sortable = Sortable.create(el,{
          animation: 150,
          swapThreshold: 0.65,
          onEnd: (e) => this.updateSort(e),
        });
  }

  content() {
    return (
      <div className="ExtensionPage-settings FlarumBadgesPage">
        <div className="container">

          <div style="padding-bottom:10px">
            <Button className={'Button'} onclick={() => app.modal.show(SyncTronscanAddModal)}>
              {app.translator.trans('wusong8899-links-queue.admin.link-add')}
            </Button>
          </div>

          <ul id="linksQueueSortableItems" style="padding:0px;list-style-type: none;" oncreate={this.initSort.bind(this)}>
            {this.syncTronscanList.map((syncTronscanItemData) => {
              return (
                <li itemID={syncTronscanItemData.id()} style="margin-top:5px;background: var(--body-bg);">
                  {SyncTronscanListItem.component({ syncTronscanItemData })}
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    );
  }

  updateSort(e){
    const newIndex = e.newIndex;
    const oldIndex = e.oldIndex;

    if(newIndex!==oldIndex){
      const children = e.from.children;
      const linkQueueOrder = {};

      for(let i=0;i<children.length;i++){
        const child = children[i];
        const itemID = $(child).attr("itemID");

        linkQueueOrder[itemID] = i;
      }

      app.request({
        url: `${app.forum.attribute('apiUrl')}/syncTronscanList/order`,
        method: 'POST',
        body: { linkQueueOrder },
      });
    }
  }

  parseResults(results) {
    [].push.apply(this.syncTronscanList, results);
    m.redraw();
    return results;
  }

  loadResults() {
    return app.store
      .find("syncTronscanList")
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }
}
