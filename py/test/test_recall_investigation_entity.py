# RecallInvestigation entity test

import json
import os
import time

import pytest

from wenmarvin_sdk.utility.voxgig_struct import voxgig_struct as vs
from wenmarvin_sdk import WenmarVinSDK
from wenmarvin_sdk.core import helpers
from wenmarvin_sdk.config import shared_config
from wenmarvin_sdk.feature.base_feature import WenmarVinBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestRecallInvestigationEntity:

    def test_should_create_instance(self):
        testsdk = WenmarVinSDK.test(None, None)
        ent = testsdk.RecallInvestigation(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WenmarVinSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.RecallInvestigation(None).list({"campaign": 1, "recall_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _recall_investigation_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "recall_investigation." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["campaign01", "recall01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WENMAR_VIN_TEST_RECALL_INVESTIGATION_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        recall_investigation_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.recall_investigation")))
        recall_investigation_ref01_data = None
        if len(recall_investigation_ref01_data_raw) > 0:
            recall_investigation_ref01_data = helpers.to_map(recall_investigation_ref01_data_raw[0][1])

        # LIST
        recall_investigation_ref01_ent = client.RecallInvestigation(None)
        recall_investigation_ref01_match = {
            "campaign": setup["idmap"]["campaign01"],
            "recall_id": setup["idmap"]["recall01"],
        }

        recall_investigation_ref01_list_result = recall_investigation_ref01_ent.list(recall_investigation_ref01_match, None)
        assert isinstance(recall_investigation_ref01_list_result, list)



def _recall_investigation_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/recall_investigation/RecallInvestigationTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WenmarVinSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["recall_investigation01", "recall_investigation02", "recall_investigation03", "recall01", "recall02", "recall03", "campaign01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "WENMAR_VIN_TEST_RECALL_INVESTIGATION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WENMAR_VIN_TEST_RECALL_INVESTIGATION_ENTID": idmap,
        "WENMAR_VIN_TEST_LIVE": "FALSE",
        "WENMAR_VIN_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("WENMAR_VIN_TEST_RECALL_INVESTIGATION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("WENMAR_VIN_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = WenmarVinSDK(helpers.to_map(merged_opts))

    _live = env.get("WENMAR_VIN_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("WENMAR_VIN_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
