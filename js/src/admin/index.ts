import SettingsPage from './components/SettingsPage';
import SyncTronscan from '../forum/model/SyncTronscan';

/**
 * Initialize the SyncTronscan extension for the admin frontend
 */
app.initializers.add('wusong8899-client1-sync-tronscan', () => {
  // Register the SyncTronscan model with the store
  app.store.models.syncTronscanList = SyncTronscan;

  // Register the settings page for this extension
  app.extensionData.for('wusong8899-client1-sync-tronscan').registerPage(SettingsPage);
});
