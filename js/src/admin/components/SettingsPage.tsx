import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import SyncTronscanAddModal from './SyncTronscanAddModal';
import SyncTronscanListItem from './SyncTronscanListItem';
import { SyncTronscanModel, OrderUpdateRequest } from '../../common/types';
import Sortable, { SortableEvent } from 'sortablejs';
import type Mithril from 'mithril';

/**
 * Admin settings page for managing SyncTronscan items
 */
export default class SettingsPage extends ExtensionPage {
  private loading: boolean = false;
  private syncTronscanList: SyncTronscanModel[] = [];

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
    this.loading = false;
    this.syncTronscanList = [];
    this.loadResults();
  }

  /**
   * Initialize the sortable functionality for the list items
   */
  private initSort(): void {
    const el = document.getElementById('linksQueueSortableItems');
    if (el) {
      Sortable.create(el, {
        animation: 150,
        swapThreshold: 0.65,
        onEnd: (e: SortableEvent) => this.updateSort(e),
      });
    }
  }

  content(): Mithril.Children {
    return (
      <div className="ExtensionPage-settings FlarumBadgesPage">
        <div className="container">
          <div style="padding-bottom:10px">
            <Button 
              className={'Button'} 
              onclick={() => app.modal.show(SyncTronscanAddModal)}
            >
              {app.translator.trans('wusong8899-links-queue.admin.link-add')}
            </Button>
          </div>

          <ul 
            id="linksQueueSortableItems" 
            style="padding:0px;list-style-type: none;" 
            oncreate={() => this.initSort()}
          >
            {this.syncTronscanList.map((syncTronscanItemData) => {
              return (
                <li 
                  itemID={syncTronscanItemData.id().toString()} 
                  style="margin-top:5px;background: var(--body-bg);"
                >
                  {SyncTronscanListItem.component({ syncTronscanItemData })}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  /**
   * Handle the sort update when items are reordered
   */
  private updateSort(e: SortableEvent): void {
    const newIndex = e.newIndex;
    const oldIndex = e.oldIndex;

    if (newIndex !== undefined && oldIndex !== undefined && newIndex !== oldIndex && e.from) {
      const children = e.from.children;
      const linkQueueOrder: Record<string, number> = {};

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        const itemID = child.getAttribute('itemID');
        
        if (itemID) {
          linkQueueOrder[itemID] = i;
        }
      }

      const requestData: OrderUpdateRequest = { linkQueueOrder };

      app.request({
        url: `${app.forum.attribute('apiUrl')}/syncTronscanList/order`,
        method: 'POST',
        body: requestData,
      })
      .catch(() => {
        // Handle error silently
      });
    }
  }

  /**
   * Parse and add results to the syncTronscanList
   */
  private parseResults(results: SyncTronscanModel[]): SyncTronscanModel[] {
    this.syncTronscanList.push(...results);
    m.redraw();
    return results;
  }

  /**
   * Load SyncTronscan items from the API
   */
  private loadResults(): Promise<SyncTronscanModel[]> {
    return app.store
      .find('syncTronscanList')
      .catch(() => {
        return [];
      })
      .then((results: SyncTronscanModel[]) => this.parseResults(results));
  }
}
