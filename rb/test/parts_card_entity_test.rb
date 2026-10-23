# PartsCard entity test

require "minitest/autorun"
require "json"
require_relative "../WenmarVin_sdk"
require_relative "runner"

class PartsCardEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WenmarVinSDK.test(nil, nil)
    ent = testsdk.PartsCard(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WenmarVinConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WenmarVinSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.PartsCard(nil).list({ "vin_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = parts_card_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "parts_card." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["vin01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WENMAR_VIN_TEST_PARTS_CARD_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    parts_card_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.parts_card")))
    parts_card_ref01_data = nil
    if parts_card_ref01_data_raw.length > 0
      parts_card_ref01_data = Helpers.to_map(parts_card_ref01_data_raw[0][1])
    end

    # LIST
    parts_card_ref01_ent = client.PartsCard(nil)
    parts_card_ref01_match = {
      "vin_id" => setup[:idmap]["vin01"],
    }

    parts_card_ref01_list_result = parts_card_ref01_ent.list(parts_card_ref01_match, nil)
    assert parts_card_ref01_list_result.is_a?(Array)

  end
end

def parts_card_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "parts_card", "PartsCardTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WenmarVinSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["parts_card01", "parts_card02", "parts_card03", "vin01", "vin02", "vin03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WENMAR_VIN_TEST_PARTS_CARD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WENMAR_VIN_TEST_PARTS_CARD_ENTID" => idmap,
    "WENMAR_VIN_TEST_LIVE" => "FALSE",
    "WENMAR_VIN_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["WENMAR_VIN_TEST_PARTS_CARD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["WENMAR_VIN_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = WenmarVinSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["WENMAR_VIN_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["WENMAR_VIN_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
