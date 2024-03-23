<?php

namespace App\Shared;

class ApiResponser
{
    const unprocessableEntity = 'unprocessableEntity';

    public static function generateMessageStore(string $model)
    {
        return 'Store ' . $model . ' successfully';
    }

    public static function generateMessageUpdate(string $model)
    {
        return 'Update ' . $model . ' successfully';
    }

    public static function generateMessageDestroy(string $model)
    {
        return 'Destroy ' . $model . ' successfully';
    }

    public static function generateMessageGetIndex(string $model)
    {
        return 'Get index ' . $model . ' successfully';
    }

    public static function generateMessageGetData(string $model)
    {
        return 'Get data ' . $model . ' successfully';
    }

    public static function generateMessageSetActiveStatus(string $model)
    {
        return 'Set active ' . $model . ' successfully';
    }

    public static function generateMessageSetInactiveStatus(string $model)
    {
        return 'Set inactive ' . $model . ' successfully';
    }

    public static function successResponser($data, $message = null, $code = 200)
    {
        return response()->json([
            'status' => 'Success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public static function errorResponse($message = null, $code = 400, $data = null)
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
