<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class StorageHelper
{
    public static function generateNewFileName($originalFileName)
    {
        return Str::uuid()->toString() . '.' .  $originalFileName;
    }

    public static function getUrlSorage($path)
    {
        return env('APP_URL') . '/storage' . $path;
    }
}
