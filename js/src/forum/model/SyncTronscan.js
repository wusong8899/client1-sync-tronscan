import Model from "flarum/Model";

export default class SyncTronscan extends Model {}
Object.assign(SyncTronscan.prototype, {
  id: Model.attribute("id"),
  name: Model.attribute("name"),
  url: Model.attribute("url"),
  img: Model.attribute("img"),
  desc: Model.attribute("desc"),
  valueUsd: Model.attribute("valueUsd"),
  sort: Model.attribute("sort"),
  updateTime: Model.attribute("updateTime"),
});
