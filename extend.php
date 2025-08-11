<?php

use Flarum\Extend;
use wusong8899\SyncTronscan\Controllers\ListSyncTronscanController;
use wusong8899\SyncTronscan\Controllers\SyncTronscanAddController;
use wusong8899\SyncTronscan\Controllers\SyncTronscanUpdateController;
use wusong8899\SyncTronscan\Controllers\SyncTronscanValueUsdUpdateController;
use wusong8899\SyncTronscan\Controllers\SyncTronscanDeleteController;
use wusong8899\SyncTronscan\Controllers\SyncTronscanSortController;

use wusong8899\SyncTronscan\Console\SyncTronscanCommand;
use wusong8899\SyncTronscan\Console\PublishSchedule;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js')->css(__DIR__ . '/less/admin.less'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less'),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Routes('api'))
        ->get('/syncTronscanList', 'syncTronscanList.get', ListSyncTronscanController::class)
        ->patch('/syncTronscanList/{id}', 'syncTronscanList.update', SyncTronscanUpdateController::class)
        ->delete('/syncTronscanList/{id}', 'syncTronscanList.delete', SyncTronscanDeleteController::class)
        ->post('/syncTronscanList', 'syncTronscanList.add', SyncTronscanAddController::class)
        ->post('/syncTronscanList/order', 'syncTronscanList.order', SyncTronscanSortController::class)
        ->post('/syncTronscanValueUsd', 'syncTronscanValueUsd.update', SyncTronscanValueUsdUpdateController::class),



    (new Extend\Console())
        ->command(SyncTronscanCommand::class)
        ->schedule(SyncTronscanCommand::class, new PublishSchedule()),
];

return $extend;