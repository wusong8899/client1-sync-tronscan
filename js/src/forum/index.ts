import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import SyncTronscan from './model/SyncTronscan';
import { TronscanUIManager } from './components/TronscanUIManager';

/**
 * Initialize the SyncTronscan extension for the forum frontend
 */
app.initializers.add('wusong8899-client1-sync-tronscan', () => {
  // Register the SyncTronscan model with the store
  app.store.models.syncTronscanList = SyncTronscan;

  // Initialize UI manager
  const tronscanUIManager = new TronscanUIManager();

  // Extend HeaderPrimary to add Tronscan UI
  extend(HeaderPrimary.prototype, 'view', function (_vnode) {
    // Check if we're on the tags page or appropriate page
    if (this.isTagsPage()) {
      // Initialize Tronscan UI components
      setTimeout(() => {
        tronscanUIManager.initialize().catch(() => {
          // Silently handle initialization errors
        });
      }, 100);
    }
  });

  // Add helper method to check if we're on tags page
  HeaderPrimary.prototype.isTagsPage = function () {
    const currentPath = window.location.pathname;
    return currentPath.includes('/tags') || currentPath === '/';
  };
});
