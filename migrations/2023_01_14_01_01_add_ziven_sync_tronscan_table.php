<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('wusong8899_sync_tronscan')) {
            $schema->create('wusong8899_sync_tronscan', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name', 255);
                $table->string('desc', 50);
                $table->string('url', 500);
                $table->string('key', 100);
                $table->string('img', 500);
                $table->double('valueUsd');
                $table->integer('sort')->unsigned()->default(0);
                $table->dateTime('updateTime');

                $table->index('sort');
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->drop('wusong8899_sync_tronscan');
    },
];
