<?php

namespace wusong8899\SyncTronscan\Controllers;

use wusong8899\SyncTronscan\Serializer\SyncTronscanSerializer;
use wusong8899\SyncTronscan\Model\SyncTronscan;
use wusong8899\SyncTronscan\Helpers\CommonHelper;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Carbon;

class SyncTronscanAddController extends AbstractCreateController
{
    public $serializer = SyncTronscanSerializer::class;
    protected $settings;
    protected $translator;

    public function __construct(Translator $translator, SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $requestData = $request->getParsedBody()['data']['attributes'];
        $errorMessage = "";

        if (!isset($requestData)) {
            $errorMessage = 'wusong8899-guaguale.admin.guaguale-add-error';
        } else {
            $url = $requestData['url'];
            $name = $requestData['name'];
            $img = $requestData['img'];
            $desc = $requestData['desc'];

            $urlExplode = explode("/", $url);
            $key = substr($urlExplode[count($urlExplode) - 1], 0, 34);
            $urlAPI = "https://apilist.tronscanapi.com/api/account/token_asset_overview?address=" . $key;

            $get_data = CommonHelper::callAPI('GET', $urlAPI, false);
            $response = json_decode($get_data, true);
            $valueUsd = $response["totalAssetInUsd"];

            $syncTronscan = new SyncTronscan();
            $syncTronscan->name = $name;
            $syncTronscan->url = $url;
            $syncTronscan->key = $key;
            $syncTronscan->img = $img;
            $syncTronscan->desc = $desc;
            $syncTronscan->valueUsd = $valueUsd;
            $syncTronscan->updateTime = Carbon::now('Asia/Shanghai');
            $syncTronscan->save();

            return $syncTronscan;
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
