<?php

namespace wusong8899\SyncTronscan\Controllers;

use wusong8899\SyncTronscan\Serializer\SyncTronscanSerializer;
use wusong8899\SyncTronscan\Model\SyncTronscan;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListSyncTronscanController extends AbstractListController
{
    public $serializer = SyncTronscanSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return SyncTronscan::orderBy('sort', 'asc')->get();
    }
}
