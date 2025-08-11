<?php

namespace wusong8899\SyncTronscan\Controllers;

use wusong8899\SyncTronscan\Serializer\SyncTronscanSerializer;
use wusong8899\SyncTronscan\Model\SyncTronscan;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class SyncTronscanUpdateController extends AbstractCreateController
{
    public $serializer = SyncTronscanSerializer::class;
    protected $translator;

    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();
        $linkID = Arr::get($request->getQueryParams(), 'id');

        if (!isset($linkID)) {
            $errorMessage = 'wusong8899-sync-tronscan.admin.save-error';
        } else {
            $linkSaveData = Arr::get($request->getParsedBody(), 'data', null);
            $errorMessage = "";
            $linkData = SyncTronscan::find($linkID);

            if (!isset($linkData)) {
                $errorMessage = 'wusong8899-sync-tronscan.admin.save-error';
            } else {
                if (Arr::has($linkSaveData, "attributes.name")) {
                    $linkData->name = Arr::get($linkSaveData, "attributes.name", null);
                }
                if (Arr::has($linkSaveData, "attributes.url")) {
                    $linkData->url = Arr::get($linkSaveData, "attributes.url", null);
                }
                if (Arr::has($linkSaveData, "attributes.img")) {
                    $linkData->img = Arr::get($linkSaveData, "attributes.img", null);
                }
                if (Arr::has($linkSaveData, "attributes.desc")) {
                    $linkData->desc = Arr::get($linkSaveData, "attributes.desc", null);
                }

                $linkData->save();

                return $linkData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
