<?php

namespace wusong8899\SyncTronscan\Model;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;

class SyncTronscan extends AbstractModel
{
    use ScopeVisibilityTrait;
    protected $table = 'wusong8899_sync_tronscan';
}
