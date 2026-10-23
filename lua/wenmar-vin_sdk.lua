-- WenmarVin SDK

local json = require("dkjson")
local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")
local unreadable_body = require("utility.unreadable_body")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("wenmar-vin_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local WenmarVinSDK = {}

-- The options and the root context both hold the credential. They live in
-- a side table rather than in the client, so a dump or an encoder walking
-- the client's fields never reaches them; `sdk.options` still reads and
-- writes through the metamethods, and options_map() is the documented way
-- to read the credential back.
local HIDDEN = { options = true, _rootctx = true }
local SLOTS = setmetatable({}, { __mode = "k" })

WenmarVinSDK.__index = function(self, key)
  local member = rawget(WenmarVinSDK, key)
  if member ~= nil then
    return member
  end
  if HIDDEN[key] then
    local slots = SLOTS[self]
    return slots ~= nil and slots[key] or nil
  end
  return nil
end

WenmarVinSDK.__newindex = function(self, key, val)
  if HIDDEN[key] then
    local slots = SLOTS[self]
    if slots == nil then
      slots = {}
      SLOTS[self] = slots
    end
    slots[key] = val
  else
    rawset(self, key, val)
  end
end

-- The client's own record: what a serialiser or clean's snapshot sees in
-- place of the client, so neither reaches the options through it.
function WenmarVinSDK:to_record()
  return { sdk = "WenmarVin", mode = self.mode }
end

WenmarVinSDK.__tostring = function(self)
  return "WenmarVinSDK mode=" .. tostring(self.mode)
end

WenmarVinSDK.__tojson = function(self)
  return json.encode(self:to_record())
end


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

WenmarVinSDK._make_feature = _make_feature


function WenmarVinSDK.new(options)
  local self = setmetatable({}, WenmarVinSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: ratelimit
  -- feature: retry
  -- feature: test
  -- feature: timeout


  return self
end


function WenmarVinSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function WenmarVinSDK:get_utility()
  return Utility.copy(self._utility)
end


function WenmarVinSDK:get_root_ctx()
  return self._rootctx
end


function WenmarVinSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" or method == "" then method = "GET" end
  method = string.upper(method)

  local allow_method = vs.getpath(options, "allow.method")
  if not helpers.allowed(allow_method, method) then
    return nil, ctx:make_error("spec_method_allow",
      'Method "' .. method ..
      '" not allowed by SDK option allow.method value: "' .. tostring(allow_method or "") .. '"')
  end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function WenmarVinSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function WenmarVinSDK:_op_allowed(op)
  return helpers.allowed(vs.getpath(self.options, "allow.op"), op)
end


function WenmarVinSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "WenmarVinSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function WenmarVinSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = utility.clean(ctx, fetch_err) }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    local body_err = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
      if vs.getprop(fetched, "unreadable") == true then
        local failed = nil
        if status < 200 or status >= 300 then
          failed = ctx:make_error("request_status",
            "request: " .. tostring(status) .. ": " .. tostring(vs.getprop(fetched, "statusText")))
        end
        body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
          fetchdef["headers"], failed)
      end
    end

    local out = {
      ok = body_err == nil and status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }
    if body_err ~= nil then
      out.err = utility.clean(ctx, body_err)
    end
    return out, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function WenmarVinSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "WenmarVinSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Batch():list() / client:Batch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Batch(data)
  local EntityMod = require("entity.batch_entity")
  if data == nil then
    if self._batch == nil then
      self._batch = EntityMod.new(self, nil)
    end
    return self._batch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Bulletin():list() / client:Bulletin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Bulletin(data)
  local EntityMod = require("entity.bulletin_entity")
  if data == nil then
    if self._bulletin == nil then
      self._bulletin = EntityMod.new(self, nil)
    end
    return self._bulletin
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Code():list() / client:Code():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Code(data)
  local EntityMod = require("entity.code_entity")
  if data == nil then
    if self._code == nil then
      self._code = EntityMod.new(self, nil)
    end
    return self._code
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Data():list() / client:Data():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Data(data)
  local EntityMod = require("entity.data_entity")
  if data == nil then
    if self._data == nil then
      self._data = EntityMod.new(self, nil)
    end
    return self._data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Engine():list() / client:Engine():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Engine(data)
  local EntityMod = require("entity.engine_entity")
  if data == nil then
    if self._engine == nil then
      self._engine = EntityMod.new(self, nil)
    end
    return self._engine
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Entry():list() / client:Entry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Entry(data)
  local EntityMod = require("entity.entry_entity")
  if data == nil then
    if self._entry == nil then
      self._entry = EntityMod.new(self, nil)
    end
    return self._entry
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Job():list() / client:Job():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Job(data)
  local EntityMod = require("entity.job_entity")
  if data == nil then
    if self._job == nil then
      self._job = EntityMod.new(self, nil)
    end
    return self._job
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Make():list() / client:Make():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Make(data)
  local EntityMod = require("entity.make_entity")
  if data == nil then
    if self._make == nil then
      self._make = EntityMod.new(self, nil)
    end
    return self._make
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Model():list() / client:Model():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Model(data)
  local EntityMod = require("entity.model_entity")
  if data == nil then
    if self._model == nil then
      self._model = EntityMod.new(self, nil)
    end
    return self._model
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Overview():list() / client:Overview():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Overview(data)
  local EntityMod = require("entity.overview_entity")
  if data == nil then
    if self._overview == nil then
      self._overview = EntityMod.new(self, nil)
    end
    return self._overview
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PartsCard():list() / client:PartsCard():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:PartsCard(data)
  local EntityMod = require("entity.parts_card_entity")
  if data == nil then
    if self._parts_card == nil then
      self._parts_card = EntityMod.new(self, nil)
    end
    return self._parts_card
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PayrollDeduction():list() / client:PayrollDeduction():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:PayrollDeduction(data)
  local EntityMod = require("entity.payroll_deduction_entity")
  if data == nil then
    if self._payroll_deduction == nil then
      self._payroll_deduction = EntityMod.new(self, nil)
    end
    return self._payroll_deduction
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Recall():list() / client:Recall():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Recall(data)
  local EntityMod = require("entity.recall_entity")
  if data == nil then
    if self._recall == nil then
      self._recall = EntityMod.new(self, nil)
    end
    return self._recall
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RecallInvestigation():list() / client:RecallInvestigation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:RecallInvestigation(data)
  local EntityMod = require("entity.recall_investigation_entity")
  if data == nil then
    if self._recall_investigation == nil then
      self._recall_investigation = EntityMod.new(self, nil)
    end
    return self._recall_investigation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Recent():list() / client:Recent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Recent(data)
  local EntityMod = require("entity.recent_entity")
  if data == nil then
    if self._recent == nil then
      self._recent = EntityMod.new(self, nil)
    end
    return self._recent
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Submodel():list() / client:Submodel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Submodel(data)
  local EntityMod = require("entity.submodel_entity")
  if data == nil then
    if self._submodel == nil then
      self._submodel = EntityMod.new(self, nil)
    end
    return self._submodel
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Vehicle():list() / client:Vehicle():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Vehicle(data)
  local EntityMod = require("entity.vehicle_entity")
  if data == nil then
    if self._vehicle == nil then
      self._vehicle = EntityMod.new(self, nil)
    end
    return self._vehicle
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleBulletin():list() / client:VehicleBulletin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleBulletin(data)
  local EntityMod = require("entity.vehicle_bulletin_entity")
  if data == nil then
    if self._vehicle_bulletin == nil then
      self._vehicle_bulletin = EntityMod.new(self, nil)
    end
    return self._vehicle_bulletin
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleCode():list() / client:VehicleCode():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleCode(data)
  local EntityMod = require("entity.vehicle_code_entity")
  if data == nil then
    if self._vehicle_code == nil then
      self._vehicle_code = EntityMod.new(self, nil)
    end
    return self._vehicle_code
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleComplaint():list() / client:VehicleComplaint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleComplaint(data)
  local EntityMod = require("entity.vehicle_complaint_entity")
  if data == nil then
    if self._vehicle_complaint == nil then
      self._vehicle_complaint = EntityMod.new(self, nil)
    end
    return self._vehicle_complaint
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleFluid():list() / client:VehicleFluid():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleFluid(data)
  local EntityMod = require("entity.vehicle_fluid_entity")
  if data == nil then
    if self._vehicle_fluid == nil then
      self._vehicle_fluid = EntityMod.new(self, nil)
    end
    return self._vehicle_fluid
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleFuel():list() / client:VehicleFuel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleFuel(data)
  local EntityMod = require("entity.vehicle_fuel_entity")
  if data == nil then
    if self._vehicle_fuel == nil then
      self._vehicle_fuel = EntityMod.new(self, nil)
    end
    return self._vehicle_fuel
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleInvestigation():list() / client:VehicleInvestigation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleInvestigation(data)
  local EntityMod = require("entity.vehicle_investigation_entity")
  if data == nil then
    if self._vehicle_investigation == nil then
      self._vehicle_investigation = EntityMod.new(self, nil)
    end
    return self._vehicle_investigation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleLabor():list() / client:VehicleLabor():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleLabor(data)
  local EntityMod = require("entity.vehicle_labor_entity")
  if data == nil then
    if self._vehicle_labor == nil then
      self._vehicle_labor = EntityMod.new(self, nil)
    end
    return self._vehicle_labor
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleRecall():list() / client:VehicleRecall():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleRecall(data)
  local EntityMod = require("entity.vehicle_recall_entity")
  if data == nil then
    if self._vehicle_recall == nil then
      self._vehicle_recall = EntityMod.new(self, nil)
    end
    return self._vehicle_recall
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleSafety():list() / client:VehicleSafety():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleSafety(data)
  local EntityMod = require("entity.vehicle_safety_entity")
  if data == nil then
    if self._vehicle_safety == nil then
      self._vehicle_safety = EntityMod.new(self, nil)
    end
    return self._vehicle_safety
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleSpec():list() / client:VehicleSpec():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleSpec(data)
  local EntityMod = require("entity.vehicle_spec_entity")
  if data == nil then
    if self._vehicle_spec == nil then
      self._vehicle_spec = EntityMod.new(self, nil)
    end
    return self._vehicle_spec
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VehicleTire():list() / client:VehicleTire():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VehicleTire(data)
  local EntityMod = require("entity.vehicle_tire_entity")
  if data == nil then
    if self._vehicle_tire == nil then
      self._vehicle_tire = EntityMod.new(self, nil)
    end
    return self._vehicle_tire
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Vin():list() / client:Vin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:Vin(data)
  local EntityMod = require("entity.vin_entity")
  if data == nil then
    if self._vin == nil then
      self._vin = EntityMod.new(self, nil)
    end
    return self._vin
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VinBulletin():list() / client:VinBulletin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VinBulletin(data)
  local EntityMod = require("entity.vin_bulletin_entity")
  if data == nil then
    if self._vin_bulletin == nil then
      self._vin_bulletin = EntityMod.new(self, nil)
    end
    return self._vin_bulletin
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VinFluid():list() / client:VinFluid():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VinFluid(data)
  local EntityMod = require("entity.vin_fluid_entity")
  if data == nil then
    if self._vin_fluid == nil then
      self._vin_fluid = EntityMod.new(self, nil)
    end
    return self._vin_fluid
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VinFuel():list() / client:VinFuel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VinFuel(data)
  local EntityMod = require("entity.vin_fuel_entity")
  if data == nil then
    if self._vin_fuel == nil then
      self._vin_fuel = EntityMod.new(self, nil)
    end
    return self._vin_fuel
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VinLabor():list() / client:VinLabor():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VinLabor(data)
  local EntityMod = require("entity.vin_labor_entity")
  if data == nil then
    if self._vin_labor == nil then
      self._vin_labor = EntityMod.new(self, nil)
    end
    return self._vin_labor
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VinRecall():list() / client:VinRecall():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VinRecall(data)
  local EntityMod = require("entity.vin_recall_entity")
  if data == nil then
    if self._vin_recall == nil then
      self._vin_recall = EntityMod.new(self, nil)
    end
    return self._vin_recall
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VinSpec():list() / client:VinSpec():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VinSpec(data)
  local EntityMod = require("entity.vin_spec_entity")
  if data == nil then
    if self._vin_spec == nil then
      self._vin_spec = EntityMod.new(self, nil)
    end
    return self._vin_spec
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VinTire():list() / client:VinTire():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WenmarVinSDK:VinTire(data)
  local EntityMod = require("entity.vin_tire_entity")
  if data == nil then
    if self._vin_tire == nil then
      self._vin_tire = EntityMod.new(self, nil)
    end
    return self._vin_tire
  end
  return EntityMod.new(self, data)
end




function WenmarVinSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = WenmarVinSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return WenmarVinSDK
