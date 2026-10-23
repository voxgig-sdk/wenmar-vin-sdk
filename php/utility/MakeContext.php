<?php
declare(strict_types=1);

// WenmarVin SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WenmarVinMakeContext
{
    public static function call(array $ctxmap, ?WenmarVinContext $basectx): WenmarVinContext
    {
        return new WenmarVinContext($ctxmap, $basectx);
    }
}
