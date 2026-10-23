package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/wenmar-vin-sdk/go"
	"github.com/voxgig-sdk/wenmar-vin-sdk/go/core"

	vs "github.com/voxgig-sdk/wenmar-vin-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const parts_cardEntityLiveStrict = true


func TestPartsCardEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PartsCard(nil)
		if ent == nil {
			t.Fatal("expected non-nil PartsCardEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PartsCard(nil).List(map[string]any{"vin_id": 1}, nil)
		if sdkerr, ok := err.(*core.WenmarVinError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := parts_cardBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "parts_card." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"vin01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, parts_cardEntityLiveStrict, "Live entity test blocked: needs %s via WENMAR_VIN_TEST_PARTS_CARD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		partsCardRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.parts_card")))
		var partsCardRef01Data map[string]any
		if len(partsCardRef01DataRaw) > 0 {
			partsCardRef01Data = core.ToMapAny(partsCardRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = partsCardRef01Data

		// LIST
		partsCardRef01Ent := client.PartsCard(nil)
		partsCardRef01Match := map[string]any{
			"vin_id": setup.idmap["vin01"],
		}

		partsCardRef01ListResult, err := partsCardRef01Ent.List(partsCardRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, partsCardRef01ListOk := partsCardRef01ListResult.([]any)
		if !partsCardRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", partsCardRef01ListResult)
		}

	})
}

func parts_cardBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "parts_card", "PartsCardTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read parts_card test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse parts_card test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"parts_card01", "parts_card02", "parts_card03", "vin01", "vin02", "vin03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WENMAR_VIN_TEST_PARTS_CARD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WENMAR_VIN_TEST_PARTS_CARD_ENTID": idmap,
		"WENMAR_VIN_TEST_LIVE":      "FALSE",
		"WENMAR_VIN_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["WENMAR_VIN_TEST_PARTS_CARD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["WENMAR_VIN_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewWenmarVinSDK(core.ToMapAny(mergedOpts))
	}

	live := env["WENMAR_VIN_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["WENMAR_VIN_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
