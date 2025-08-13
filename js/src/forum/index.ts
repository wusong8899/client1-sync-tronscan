import app from 'flarum/forum/app';
import SyncTronscan from './model/SyncTronscan';

/**
 * Initialize the SyncTronscan extension for the forum frontend
 */
app.initializers.add('wusong8899-client1-sync-tronscan', () => {
  // Register the SyncTronscan model with the store
  app.store.models.syncTronscanList = SyncTronscan;
});
