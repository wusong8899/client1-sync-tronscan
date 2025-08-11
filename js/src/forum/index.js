import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import SyncTronscan from "./model/SyncTronscan";

app.initializers.add('wusong8899-client1-sync-tronscan', () => {
  app.store.models.syncTronscanList = SyncTronscan;
});