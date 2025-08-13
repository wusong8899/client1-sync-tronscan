import Model from 'flarum/common/Model';
import { SyncTronscanModel } from '../../common/types';

/**
 * SyncTronscan model class for handling TronScan synchronization data
 */
export default class SyncTronscan extends Model implements SyncTronscanModel {
  id!: () => string | number;
  name!: () => string;
  url!: () => string;
  img!: () => string;
  desc!: () => string;
  valueUsd!: () => string | number;
  sort!: () => number;
  updateTime!: () => string;
}

Object.assign(SyncTronscan.prototype, {
  id: Model.attribute('id'),
  name: Model.attribute('name'),
  url: Model.attribute('url'),
  img: Model.attribute('img'),
  desc: Model.attribute('desc'),
  valueUsd: Model.attribute('valueUsd'),
  sort: Model.attribute('sort'),
  updateTime: Model.attribute('updateTime'),
});
