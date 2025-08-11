<?php

namespace wusong8899\SyncTronscan\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class SyncTronscanSerializer extends AbstractSerializer
{
    protected $type = 'syncTronscanList';

    protected function getDefaultAttributes($data)
    {
        $attributes = [
            'id' => $data->id,
            'name' => $data->name,
            'desc' => $data->desc,
            'url' => $data->url,
            'img' => $data->img,
            'valueUsd' => $data->valueUsd,
            'sort' => $data->sort,
            'updateTime' => $data->updateTime
        ];

        return $attributes;
    }
}
