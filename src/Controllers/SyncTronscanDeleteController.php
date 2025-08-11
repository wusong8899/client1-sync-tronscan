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

class SyncTronscanDeleteController extends AbstractCreateController
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
        $linkQueueID = Arr::get($request->getQueryParams(), 'id');

        if (!isset($linkQueueID)) {
            $errorMessage = 'wusong8899-links-queue.admin.delete-error';
        } else {
            $errorMessage = "";
            $linkQueueData = SyncTronscan::find($linkQueueID);

            if (!isset($linkQueueData)) {
                $errorMessage = 'wusong8899-links-queue.admin.delete-error';
            } else {
                $linkQueueData->delete();
                return $linkQueueData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
