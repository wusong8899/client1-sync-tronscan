import {extend, override} from 'flarum/extend';
import SettingsPage from './components/SettingsPage';
import SyncTronscan from "../forum/model/SyncTronscan";

app.initializers.add('wusong8899-client1-sync-tronscan', () => {
  app.store.models.syncTronscanList = SyncTronscan;
  app.extensionData.for('wusong8899-client1-sync-tronscan').registerPage(SettingsPage);
});
