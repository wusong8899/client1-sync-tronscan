<?php

namespace wusong8899\SyncTronscan\Console;

use Flarum\Foundation\Paths;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Console\Scheduling\Event;

class PublishSchedule
{
    public function __invoke(Event $event)
    {
        $settings = resolve(SettingsRepositoryInterface::class);
        $event->daily();
        $paths = resolve(Paths::class);
        $event->appendOutputTo($paths->storage . (DIRECTORY_SEPARATOR . 'logs' . DIRECTORY_SEPARATOR . 'sync-tronscan.log'));
    }
}
