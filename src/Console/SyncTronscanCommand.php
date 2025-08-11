<?php

namespace wusong8899\SyncTronscan\Console;

use wusong8899\SyncTronscan\Model\SyncTronscan;
use wusong8899\SyncTronscan\Helpers\CommonHelper;

use Flarum\Console\AbstractCommand;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Carbon;
use Symfony\Contracts\Translation\TranslatorInterface;

class SyncTronscanCommand extends AbstractCommand
{
    protected $bus;
    protected $settings;
    protected $translator;

    public function __construct(Dispatcher $bus, SettingsRepositoryInterface $settings, TranslatorInterface $translator)
    {
        parent::__construct();
        $this->bus = $bus;
        $this->settings = $settings;
        $this->translator = $translator;
    }

    protected function configure()
    {
        $this->setName('syncTronscan:syncData')->setDescription('Sync data');
    }

    protected function fire()
    {
        // $this->info('Sync starting...');
        $syncData = SyncTronscan::orderBy('sort', 'asc')->get();

        foreach ($syncData as $key => $value) {
            $linkKey = $value->key;
            $urlAPI = "https://apilist.tronscanapi.com/api/account/token_asset_overview?address=" . $linkKey;

            $get_data = (new CommonHelper)->callAPI('GET', $urlAPI, false);
            $response = json_decode($get_data, true);

            $value->valueUsd = $response["totalAssetInUsd"];
            $value->updateTime = Carbon::now('Asia/Shanghai');
            $value->save();
        }

        // $this->info('Sync done.');
    }

}
