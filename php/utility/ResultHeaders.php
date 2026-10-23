<?php
declare(strict_types=1);

// WenmarVin SDK utility: result_headers

class WenmarVinResultHeaders
{
    public static function call(WenmarVinContext $ctx): ?WenmarVinResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
