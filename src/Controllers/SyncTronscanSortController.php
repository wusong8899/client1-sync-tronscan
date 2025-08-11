<?php

namespace wusong8899\SyncTronscan\Controllers;

use wusong8899\SyncTronscan\Serializer\SyncTronscanSerializer;
use wusong8899\SyncTronscan\Model\SyncTronscan;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class SyncTronscanSortController extends AbstractListController
{
    public $serializer = SyncTronscanSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();
        $linkQueueOrder = Arr::get($request->getParsedBody(), 'linkQueueOrder');

        foreach ($linkQueueOrder as $itemID => $order) {
            SyncTronscan::query()->where('id', $itemID)->update(['sort' => $order]);
        }
    }
}
