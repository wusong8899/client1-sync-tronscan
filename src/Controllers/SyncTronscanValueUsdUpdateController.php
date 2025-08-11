<?php

namespace wusong8899\SyncTronscan\Controllers;

use wusong8899\SyncTronscan\Serializer\SyncTronscanSerializer;
use wusong8899\SyncTronscan\Model\SyncTronscan;
use wusong8899\SyncTronscan\Helpers\CommonHelper;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Carbon;
use Illuminate\Support\Arr;

class SyncTronscanValueUsdUpdateController extends AbstractCreateController
{
    public $serializer = SyncTronscanSerializer::class;
    protected $translator;

    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();
        $linkID = Arr::get($request->getParsedBody(), 'linkID');

        if (!isset($linkID)) {
            $errorMessage = 'wusong8899-sync-tronscan.admin.save-error';
        } else {
            $linkSaveData = Arr::get($request->getParsedBody(), 'data', null);
            $errorMessage = "";
            $linkData = SyncTronscan::find($linkID);

            if (!isset($linkData)) {
                $errorMessage = 'wusong8899-sync-tronscan.admin.save-error';
            } else {
                $key = $linkData->key;
                $urlAPI = "https://apilist.tronscanapi.com/api/account/token_asset_overview?address=" . $key;

                $get_data = CommonHelper::callAPI('GET', $urlAPI, false);
                $response = json_decode($get_data, true);

                $linkData->valueUsd = $response["totalAssetInUsd"];
                $linkData->updateTime = Carbon::now('Asia/Shanghai');
                $linkData->save();

                return $linkData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
