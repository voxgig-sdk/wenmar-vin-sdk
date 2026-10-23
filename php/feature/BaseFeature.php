<?php
declare(strict_types=1);

// WenmarVin SDK base feature

class WenmarVinBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WenmarVinContext $ctx, array $options): void {}
    public function PostConstruct(WenmarVinContext $ctx): void {}
    public function PostConstructEntity(WenmarVinContext $ctx): void {}
    public function SetData(WenmarVinContext $ctx): void {}
    public function GetData(WenmarVinContext $ctx): void {}
    public function GetMatch(WenmarVinContext $ctx): void {}
    public function SetMatch(WenmarVinContext $ctx): void {}
    public function PrePoint(WenmarVinContext $ctx): void {}
    public function PreSpec(WenmarVinContext $ctx): void {}
    public function PreRequest(WenmarVinContext $ctx): void {}
    public function PreResponse(WenmarVinContext $ctx): void {}
    public function PreResult(WenmarVinContext $ctx): void {}
    public function PreDone(WenmarVinContext $ctx): void {}
    public function PreUnexpected(WenmarVinContext $ctx): void {}
}
