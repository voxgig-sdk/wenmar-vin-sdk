-- WenmarVin SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "WenmarVin",
      slug = "wenmar-vin",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://open.wenmarpro.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["batch"] = {},
        ["bulletin"] = {},
        ["code"] = {},
        ["data"] = {},
        ["engine"] = {},
        ["entry"] = {},
        ["job"] = {},
        ["make"] = {},
        ["model"] = {},
        ["overview"] = {},
        ["parts_card"] = {},
        ["payroll_deduction"] = {},
        ["recall"] = {},
        ["recall_investigation"] = {},
        ["recent"] = {},
        ["submodel"] = {},
        ["vehicle"] = {},
        ["vehicle_bulletin"] = {},
        ["vehicle_code"] = {},
        ["vehicle_complaint"] = {},
        ["vehicle_fluid"] = {},
        ["vehicle_fuel"] = {},
        ["vehicle_investigation"] = {},
        ["vehicle_labor"] = {},
        ["vehicle_recall"] = {},
        ["vehicle_safety"] = {},
        ["vehicle_spec"] = {},
        ["vehicle_tire"] = {},
        ["vin"] = {},
        ["vin_bulletin"] = {},
        ["vin_fluid"] = {},
        ["vin_fuel"] = {},
        ["vin_labor"] = {},
        ["vin_recall"] = {},
        ["vin_spec"] = {},
        ["vin_tire"] = {},
      },
    },
    entity = {
      ["batch"] = {
        ["fields"] = {
          {
            ["name"] = "vins",
            ["title"] = "Vins",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "At most 50 VINs.",
          },
        },
        ["name"] = "batch",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/vin/batch",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["lit"] = "batch",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "batch",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "include",
                      ["orig"] = "include",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "recalls",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["bulletin"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "codes",
            ["title"] = "Codes",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The trouble codes the summary names.",
          },
          {
            ["name"] = "component",
            ["title"] = "Component",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's components, in its words, separated by `; `.",
          },
          {
            ["name"] = "components",
            ["title"] = "Components",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The components it is about, systems first.",
          },
          {
            ["name"] = "date",
            ["title"] = "Date",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's own date.",
          },
          {
            ["name"] = "date_added",
            ["title"] = "Date Added",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The day NHTSA published it.",
          },
          {
            ["name"] = "document",
            ["title"] = "Document",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "document_id",
            ["title"] = "Document Id",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's own number for the document, which a dealer looks it up by.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mfr_campaign",
            ["title"] = "Mfr Campaign",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's campaign id or software version.",
          },
          {
            ["name"] = "mfr_system",
            ["title"] = "Mfr System",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's own words for the system.",
          },
          {
            ["name"] = "nhtsa_id",
            ["title"] = "Nhtsa Id",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "NHTSA's id number for the communication.",
            ["format"] = "int64",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "replaces",
            ["title"] = "Replaces",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The number of the bulletin this one replaces.",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's summary of the communication.",
          },
          {
            ["name"] = "topics",
            ["title"] = "Topics",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`.",
          },
          {
            ["name"] = "type_name",
            ["title"] = "Type Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The type in words.",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The bulletin's page on this site.",
          },
          {
            ["name"] = "vehicles",
            ["title"] = "Vehicles",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "bulletin",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/bulletins",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "bulletins",
                  },
                },
                ["parts"] = {
                  "v1",
                  "bulletins",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "code",
                      ["orig"] = "code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "P0420",
                    },
                    {
                      ["name"] = "component",
                      ["orig"] = "component",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "brakes",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "ford",
                    },
                    {
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "f-150",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "noise",
                    },
                    {
                      ["name"] = "topic",
                      ["orig"] = "topic",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "warranty_extension",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2018,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/bulletins/{nhtsa_id}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "bulletins",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "bulletins",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["nhtsa_id"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "nhtsa_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "10152456",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["code"] = {
        ["fields"] = {
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The credit lines the data's licences ask for.",
          },
          {
            ["name"] = "checked",
            ["title"] = "Checked",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The day it was approved.",
          },
          {
            ["name"] = "checks",
            ["title"] = "Checks",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "What a technician usually verifies first.",
          },
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "common_causes",
            ["title"] = "Common Causes",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "General causes, not about one make.",
          },
          {
            ["name"] = "components",
            ["title"] = "Components",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "generic",
            ["title"] = "Generic",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Always `true` here: only codes every maker uses the same way are described.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "meaning",
            ["title"] = "Meaning",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "What the code tells a service advisor.",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "What a description is and is not.",
          },
          {
            ["name"] = "related",
            ["title"] = "Related",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Related codes that are described too.",
          },
          {
            ["name"] = "reviewer",
            ["title"] = "Reviewer",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The GitHub name of the person who approved the text.",
          },
          {
            ["name"] = "system",
            ["title"] = "System",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it.",
          },
          {
            ["name"] = "system_name",
            ["title"] = "System Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The code's page on this site.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "code",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/codes",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "codes",
                  },
                },
                ["parts"] = {
                  "v1",
                  "codes",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "P04",
                    },
                    {
                      ["name"] = "system",
                      ["orig"] = "system",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "powertrain/emissions",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/codes/{code}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "codes",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "codes",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["code"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "P0420",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["data"] = {
        ["fields"] = {
          {
            ["name"] = "built_at",
            ["title"] = "Built At",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "When the data file was built, in UTC.",
          },
          {
            ["name"] = "data_version",
            ["title"] = "Data Version",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The data release, such as `2026.09`.",
          },
          {
            ["name"] = "datasets",
            ["title"] = "Datasets",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The datasets served beside the catalog, such as `recalls_us`, by id.",
          },
          {
            ["name"] = "server_version",
            ["title"] = "Server Version",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The version of the server.",
          },
          {
            ["name"] = "vpic_release",
            ["title"] = "Vpic Release",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The NHTSA vPIC release the data was built from.",
          },
        },
        ["name"] = "data",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/meta",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "meta",
                  },
                },
                ["parts"] = {
                  "v1",
                  "meta",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["engine"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "label",
            ["title"] = "Label",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "preset",
            ["title"] = "Preset",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether the engine comes from this project's list instead of NHTSA.",
          },
          {
            ["name"] = "vin8",
            ["title"] = "Vin8",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "engine",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/engines",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["lit"] = "engines",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "engines",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "honda",
                    },
                    {
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "civic",
                    },
                    {
                      ["name"] = "submodel",
                      ["orig"] = "submodel",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "si",
                    },
                    {
                      ["name"] = "term",
                      ["orig"] = "term",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 2019,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "make",
                    "model",
                    "year",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["entry"] = {
        ["fields"] = {
          {
            ["name"] = "body",
            ["title"] = "Body",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "drive",
            ["title"] = "Drive",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The stable id.",
          },
          {
            ["name"] = "make",
            ["title"] = "Make",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "model",
            ["title"] = "Model",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "submodel",
            ["title"] = "Submodel",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "One line naming everything above that is known.",
          },
          {
            ["name"] = "transmission",
            ["title"] = "Transmission",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "vehicle_types",
            ["title"] = "Vehicle Types",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "NHTSA's vehicle types for this model year, such as `Truck`.",
          },
          {
            ["name"] = "year",
            ["title"] = "Year",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["format"] = "int32",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "entry",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/search",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "2019 civic si",
                    },
                    {
                      ["name"] = "scope",
                      ["orig"] = "scope",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "q",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2019_honda_civic_si",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["job"] = {
        ["fields"] = {
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The credit the labour estimates ask for.",
          },
          {
            ["name"] = "components",
            ["title"] = "Components",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "estimates",
            ["title"] = "Estimates",
            ["type"] = {
              "`$ONE`",
              {
                "`$ARRAY`",
                "`$NULL`",
              },
            },
            ["short"] = "The job's class-scope figures.",
          },
          {
            ["name"] = "excludes",
            ["title"] = "Excludes",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Work often done at the same visit that is not part of this job.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The job's id.",
          },
          {
            ["name"] = "includes",
            ["title"] = "Includes",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The work the job covers.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "What an estimate is not.",
          },
          {
            ["name"] = "related",
            ["title"] = "Related",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "system",
            ["title"] = "System",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The id of the system the job belongs to.",
          },
          {
            ["name"] = "system_name",
            ["title"] = "System Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The job's page on this site.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "job",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/jobs",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "jobs",
                  },
                },
                ["parts"] = {
                  "v1",
                  "jobs",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/jobs/{job}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "jobs",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "jobs",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["job"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "job",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "brake-pads-front",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["make"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The make's id form.",
          },
          {
            ["name"] = "links",
            ["title"] = "Links",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "popular",
            ["title"] = "Popular",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether it is on the list of popular makes.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "make",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/makes",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["lit"] = "makes",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "makes",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "scope",
                      ["orig"] = "scope",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "term",
                      ["orig"] = "term",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2019,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/makes/{make}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "makes",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "makes",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["make"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "honda",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["model"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The day each country's recall data was current.",
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The model's id form.",
          },
          {
            ["name"] = "lookup",
            ["title"] = "Lookup",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Where to check one vehicle for open recalls.",
          },
          {
            ["name"] = "make",
            ["title"] = "Make",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "A make or a model: its id form and its name.",
          },
          {
            ["name"] = "may_apply",
            ["title"] = "May Apply",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Always `true`: a recall count is of campaigns that may apply to the model year.",
          },
          {
            ["name"] = "model",
            ["title"] = "Model",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "A make or a model: its id form and its name.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "year_from",
            ["title"] = "Year From",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "The first and last model year the model exists in.",
            ["format"] = "int32",
          },
          {
            ["name"] = "year_to",
            ["title"] = "Year To",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["format"] = "int32",
          },
          {
            ["name"] = "years",
            ["title"] = "Years",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["make"] = "make.name",
            ["model"] = "model.name",
          },
          ["name"] = "id",
          ["parts"] = {
            "make",
            "model",
          },
          ["sep"] = "/",
        },
        ["name"] = "model",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/models",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["lit"] = "models",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "models",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "honda",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "scope",
                      ["orig"] = "scope",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "term",
                      ["orig"] = "term",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2019,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "make",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/models/{make}/{model}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "models",
                  },
                  {
                    ["var"] = "make",
                  },
                  {
                    ["var"] = "model",
                  },
                },
                ["parts"] = {
                  "v1",
                  "models",
                  "{make}",
                  "{model}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "ford",
                    },
                    {
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "make",
                    "model",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["overview"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`.",
          },
          {
            ["name"] = "message",
            ["title"] = "Message",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "suggestions",
            ["title"] = "Suggestions",
            ["type"] = "`$ARRAY`",
            ["short"] = "VINs the caller may have meant.",
          },
        },
        ["name"] = "overview",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/overview",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "vehicle_id",
                  },
                  {
                    ["lit"] = "overview",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{vehicle_id}",
                  "overview",
                },
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "vehicle_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "vehicle_id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "vehicle_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/overview",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "vin_id",
                  },
                  {
                    ["lit"] = "overview",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{vin_id}",
                  "overview",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "vin_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "vin_id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2023,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "vin_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.vehicle",
            },
            {
              "$.main.kit.entity.vin",
            },
          },
        },
      },
      ["parts_card"] = {
        ["fields"] = {
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "engine_settled",
            ["title"] = "Engine Settled",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether the decode settled one catalog engine.",
          },
          {
            ["name"] = "lines",
            ["title"] = "Lines",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "text",
            ["title"] = "Text",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The lines as plain text, one `Label: value` each.",
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "vin",
            ["title"] = "Vin",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["name"] = "parts_card",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/parts-card",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "vin_id",
                  },
                  {
                    ["lit"] = "parts-card",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{vin_id}",
                  "parts-card",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "vin_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "vin_id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "vin_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.vin",
            },
          },
        },
      },
      ["payroll_deduction"] = {
        ["fields"] = {
          {
            ["name"] = "meaning",
            ["title"] = "Meaning",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "What the factor means.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The name the engine gives the factor.",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The value used, after rounding.",
            ["format"] = "double",
          },
        },
        ["name"] = "payroll_deduction",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/payroll/deductions",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "payroll",
                  },
                  {
                    ["lit"] = "deductions",
                  },
                },
                ["parts"] = {
                  "v1",
                  "payroll",
                  "deductions",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "federal_claim",
                      ["orig"] = "federal_claim",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "0",
                    },
                    {
                      ["name"] = "frequency",
                      ["orig"] = "frequency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "biweekly",
                    },
                    {
                      ["name"] = "gross",
                      ["orig"] = "gross",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2400.00",
                    },
                    {
                      ["name"] = "pay_date",
                      ["orig"] = "pay_date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2026-07-15",
                    },
                    {
                      ["name"] = "province",
                      ["orig"] = "province",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "ON",
                    },
                    {
                      ["name"] = "provincial_claim",
                      ["orig"] = "provincial_claim",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "0",
                    },
                    {
                      ["name"] = "ytd_cpp",
                      ["orig"] = "ytd_cpp",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "0.00",
                    },
                    {
                      ["name"] = "ytd_cpp2",
                      ["orig"] = "ytd_cpp2",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "0.00",
                    },
                    {
                      ["name"] = "ytd_ei",
                      ["orig"] = "ytd_ei",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "0.00",
                    },
                    {
                      ["name"] = "ytd_pensionable",
                      ["orig"] = "ytd_pensionable",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "0.00",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["recall"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day this publisher's data was current.",
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "built_from",
            ["title"] = "Built From",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "In an answer about one model year: the first and last build date the campaign gives.",
          },
          {
            ["name"] = "built_to",
            ["title"] = "Built To",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "campaign",
            ["title"] = "Campaign",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The publisher's campaign number.",
          },
          {
            ["name"] = "completion",
            ["title"] = "Completion",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "component",
            ["title"] = "Component",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The component, as the source words it.",
          },
          {
            ["name"] = "consequence",
            ["title"] = "Consequence",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`us` or `ca`.",
          },
          {
            ["name"] = "date",
            ["title"] = "Date",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day the campaign was reported.",
          },
          {
            ["name"] = "do_not_drive",
            ["title"] = "Do Not Drive",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's advisory not to drive the vehicle until it is repaired.",
          },
          {
            ["name"] = "french",
            ["title"] = "French",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lookup",
            ["title"] = "Lookup",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Where to check one vehicle for open recalls.",
          },
          {
            ["name"] = "manufacturer",
            ["title"] = "Manufacturer",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "match",
            ["title"] = "Match",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "In an answer about one model year: how the campaign's vehicle text reached that model.",
          },
          {
            ["name"] = "may_apply",
            ["title"] = "May Apply",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Always `true`: the campaign may apply to a vehicle it lists.",
          },
          {
            ["name"] = "mfr_campaign",
            ["title"] = "Mfr Campaign",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's own campaign number, which a dealer looks a recall up by.",
          },
          {
            ["name"] = "models",
            ["title"] = "Models",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "In an answer about one model year: the model names the campaign lists that reached it.",
          },
          {
            ["name"] = "notes",
            ["title"] = "Notes",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "notification",
            ["title"] = "Notification",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "Transport Canada's notification type, such as `Safety Mfr`.",
          },
          {
            ["name"] = "owner_notified",
            ["title"] = "Owner Notified",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day owners were notified.",
          },
          {
            ["name"] = "park_outside",
            ["title"] = "Park Outside",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's advisory to park outside, away from buildings.",
          },
          {
            ["name"] = "part_number",
            ["title"] = "Part Number",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's part numbers, separated by commas.",
          },
          {
            ["name"] = "remedy",
            ["title"] = "Remedy",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Who published it: `nhtsa` or `tc` (Transport Canada).",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "What is wrong, in the source's words.",
          },
          {
            ["name"] = "units",
            ["title"] = "Units",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "Units potentially affected.",
            ["format"] = "int32",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The campaign's page on this site.",
          },
          {
            ["name"] = "vehicles",
            ["title"] = "Vehicles",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Every vehicle the campaign lists, by make, model and year.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["campaign"] = "campaign",
            ["source"] = "source",
          },
          ["name"] = "id",
          ["parts"] = {
            "source",
            "campaign",
          },
          ["sep"] = "/",
        },
        ["name"] = "recall",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/recalls",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "recalls",
                  },
                },
                ["parts"] = {
                  "v1",
                  "recalls",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "component",
                      ["orig"] = "component",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "air bags",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "ford",
                    },
                    {
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "f-150",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "tailgate",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2018,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/recalls/{source}/{campaign}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "recalls",
                  },
                  {
                    ["var"] = "source",
                  },
                  {
                    ["var"] = "campaign",
                  },
                },
                ["parts"] = {
                  "v1",
                  "recalls",
                  "{source}",
                  "{campaign}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "campaign",
                      ["orig"] = "campaign",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "19V888000",
                    },
                    {
                      ["name"] = "source",
                      ["orig"] = "source",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "nhtsa",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "campaign",
                    "source",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["recall_investigation"] = {
        ["fields"] = {
          {
            ["name"] = "action",
            ["title"] = "Action",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "NHTSA's action number.",
          },
          {
            ["name"] = "campaigns",
            ["title"] = "Campaigns",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The recall campaigns it led to, as NHTSA numbers them.",
          },
          {
            ["name"] = "closed",
            ["title"] = "Closed",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day it was closed.",
          },
          {
            ["name"] = "component",
            ["title"] = "Component",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The components it names, as NHTSA words them, separated by `; `.",
          },
          {
            ["name"] = "kind",
            ["title"] = "Kind",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The letters the number starts with.",
          },
          {
            ["name"] = "kind_name",
            ["title"] = "Kind Name",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The kind in words.",
          },
          {
            ["name"] = "manufacturer",
            ["title"] = "Manufacturer",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturers it names, separated by `; `.",
          },
          {
            ["name"] = "match",
            ["title"] = "Match",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "In an answer about one model year: how the investigation's vehicle text reached that model.",
          },
          {
            ["name"] = "models",
            ["title"] = "Models",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "In an answer about one model year: the model names the investigation lists that reached it.",
          },
          {
            ["name"] = "open",
            ["title"] = "Open",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether it was opened in 2010 or later and has no day closed.",
          },
          {
            ["name"] = "opened",
            ["title"] = "Opened",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day it was opened.",
          },
          {
            ["name"] = "subject",
            ["title"] = "Subject",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's one-line subject.",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's summary.",
          },
        },
        ["name"] = "recall_investigation",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/recalls/{source}/{campaign}/investigations",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "recalls",
                  },
                  {
                    ["var"] = "recall_id",
                  },
                  {
                    ["var"] = "campaign",
                  },
                  {
                    ["lit"] = "investigations",
                  },
                },
                ["parts"] = {
                  "v1",
                  "recalls",
                  "{recall_id}",
                  "{campaign}",
                  "investigations",
                },
                ["rename"] = {
                  ["param"] = {
                    ["source"] = "recall_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "campaign",
                      ["orig"] = "campaign",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "18V568000",
                    },
                    {
                      ["name"] = "recall_id",
                      ["orig"] = "source",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "nhtsa",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "campaign",
                    "recall_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.recall",
            },
          },
        },
      },
      ["recent"] = {
        ["fields"] = {
          {
            ["name"] = "recall",
            ["title"] = "Recall",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "One recall campaign in a list.",
          },
          {
            ["name"] = "vehicles",
            ["title"] = "Vehicles",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The vehicles the campaign lists: at most 200 of them.",
          },
          {
            ["name"] = "vehicles_listed",
            ["title"] = "Vehicles Listed",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "How many vehicles the campaign lists in all.",
            ["format"] = "int32",
          },
        },
        ["name"] = "recent",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/recalls/recent",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "recalls",
                  },
                  {
                    ["lit"] = "recent",
                  },
                },
                ["parts"] = {
                  "v1",
                  "recalls",
                  "recent",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "ford",
                    },
                    {
                      ["name"] = "since",
                      ["orig"] = "since",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2026-09-01",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["submodel"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "kind",
            ["title"] = "Kind",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`trim` or `series` as NHTSA has it, or `preset` from this project's own list.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "submodel",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/submodels",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["lit"] = "submodels",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "submodels",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "honda",
                    },
                    {
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "civic",
                    },
                    {
                      ["name"] = "term",
                      ["orig"] = "term",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 2019,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "make",
                    "model",
                    "year",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/trims",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["lit"] = "trims",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "trims",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "make",
                      ["orig"] = "make",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "honda",
                    },
                    {
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "civic",
                    },
                    {
                      ["name"] = "term",
                      ["orig"] = "term",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 2019,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "make",
                    "model",
                    "year",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle"] = {
        ["fields"] = {},
        ["name"] = "vehicle",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/years",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["lit"] = "years",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "years",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "scope",
                      ["orig"] = "scope",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "term",
                      ["orig"] = "term",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "year",
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_bulletin"] = {
        ["fields"] = {
          {
            ["name"] = "component",
            ["title"] = "Component",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's components, in its words, separated by `; `.",
          },
          {
            ["name"] = "date",
            ["title"] = "Date",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's own date.",
          },
          {
            ["name"] = "date_added",
            ["title"] = "Date Added",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The day NHTSA published it.",
          },
          {
            ["name"] = "document",
            ["title"] = "Document",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "document_id",
            ["title"] = "Document Id",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's own number for the document, which a dealer looks it up by.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mfr_campaign",
            ["title"] = "Mfr Campaign",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's campaign id or software version.",
          },
          {
            ["name"] = "nhtsa_id",
            ["title"] = "Nhtsa Id",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "NHTSA's id number for the communication.",
            ["format"] = "int64",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's summary of the communication.",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`.",
          },
          {
            ["name"] = "type_name",
            ["title"] = "Type Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The type in words.",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The bulletin's page on this site.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_bulletin",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/bulletins",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "bulletins",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "bulletins",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "code",
                      ["orig"] = "code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "P0420",
                    },
                    {
                      ["name"] = "component",
                      ["orig"] = "component",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "brakes",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "noise",
                    },
                    {
                      ["name"] = "topic",
                      ["orig"] = "topic",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "maintenance",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "warranty_extension",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_code"] = {
        ["fields"] = {
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "bulletins",
            ["title"] = "Bulletins",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "generic",
            ["title"] = "Generic",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether every maker uses the code the same way.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "related",
            ["title"] = "Related",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What else is held for the model year about the components a code concerns.",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The page of this code on this model year.",
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The model year an answer is about.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_code",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/codes/{code}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "vehicle_id",
                  },
                  {
                    ["lit"] = "codes",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{vehicle_id}",
                  "codes",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["code"] = "id",
                    ["id"] = "vehicle_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "P0420",
                    },
                    {
                      ["name"] = "vehicle_id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "vehicle_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.vehicle",
            },
          },
        },
      },
      ["vehicle_complaint"] = {
        ["fields"] = {
          {
            ["name"] = "complaints",
            ["title"] = "Complaints",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["format"] = "int32",
          },
          {
            ["name"] = "crashes",
            ["title"] = "Crashes",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Complaints that report a crash.",
            ["format"] = "int32",
          },
          {
            ["name"] = "fires",
            ["title"] = "Fires",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Complaints that report a fire.",
            ["format"] = "int32",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "A component id, such as `steering` or `brake-pad`.",
          },
          {
            ["name"] = "injuries",
            ["title"] = "Injuries",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Complaints that report at least one person injured.",
            ["format"] = "int32",
          },
          {
            ["name"] = "median_km",
            ["title"] = "Median Km",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "The median of the mileages owners gave, in kilometres.",
            ["format"] = "int32",
          },
          {
            ["name"] = "median_miles",
            ["title"] = "Median Miles",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "The same in miles, as NHTSA records it.",
            ["format"] = "int32",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "parent",
            ["title"] = "Parent",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The system a part belongs to.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_complaint",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/complaints",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "complaints",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "complaints",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2016_honda_civic",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_fluid"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day EPA's oil grades were current.",
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "brake",
            ["title"] = "Brake",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "checked_as_of",
            ["title"] = "Checked As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day of the newest hand-read record the server holds, for any vehicle.",
          },
          {
            ["name"] = "coolant",
            ["title"] = "Coolant",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "engine_oil",
            ["title"] = "Engine Oil",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "engine_oil_checked",
            ["title"] = "Engine Oil Checked",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "refrigerant",
            ["title"] = "Refrigerant",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "transmission",
            ["title"] = "Transmission",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The model year an answer is about.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_fluid",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/fluids",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "fluids",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "fluids",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_fuel"] = {
        ["fields"] = {
          {
            ["name"] = "co2_g_km",
            ["title"] = "Co2 G Km",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "Tailpipe carbon dioxide, combined.",
            ["format"] = "int32",
          },
          {
            ["name"] = "confidence",
            ["title"] = "Confidence",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim).",
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`us` or `ca`.",
          },
          {
            ["name"] = "cylinders",
            ["title"] = "Cylinders",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "described_as",
            ["title"] = "Described As",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The source's own name for the vehicle rated.",
          },
          {
            ["name"] = "displacement_l",
            ["title"] = "Displacement L",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
            ["format"] = "double",
          },
          {
            ["name"] = "drive",
            ["title"] = "Drive",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "fuel_grade",
            ["title"] = "Fuel Grade",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The fuel the figures are for, which is the recommended grade.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kwh_100km",
            ["title"] = "Kwh 100km",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
            ["short"] = "Combined electricity use.",
            ["format"] = "double",
          },
          {
            ["name"] = "l_100km",
            ["title"] = "L 100km",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "match",
            ["title"] = "Match",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "How the model was found: `exact`, `base` or `curated`.",
          },
          {
            ["name"] = "mpg",
            ["title"] = "Mpg",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "range_km",
            ["title"] = "Range Km",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "On a full battery.",
            ["format"] = "int32",
          },
          {
            ["name"] = "range_mi",
            ["title"] = "Range Mi",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "second_fuel",
            ["title"] = "Second Fuel",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "A second fuel the vehicle takes, such as `E85` or `Electricity`.",
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`epa` or `nrcan`.",
          },
          {
            ["name"] = "source_id",
            ["title"] = "Source Id",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "EPA's id for the rating.",
          },
          {
            ["name"] = "transmission",
            ["title"] = "Transmission",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_fuel",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/fuel",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "fuel",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "fuel",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.ratings`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_investigation"] = {
        ["fields"] = {
          {
            ["name"] = "action",
            ["title"] = "Action",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "NHTSA's action number.",
          },
          {
            ["name"] = "campaigns",
            ["title"] = "Campaigns",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The recall campaigns it led to, as NHTSA numbers them.",
          },
          {
            ["name"] = "closed",
            ["title"] = "Closed",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day it was closed.",
          },
          {
            ["name"] = "component",
            ["title"] = "Component",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The components it names, as NHTSA words them, separated by `; `.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kind",
            ["title"] = "Kind",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The letters the number starts with.",
          },
          {
            ["name"] = "kind_name",
            ["title"] = "Kind Name",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The kind in words.",
          },
          {
            ["name"] = "manufacturer",
            ["title"] = "Manufacturer",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturers it names, separated by `; `.",
          },
          {
            ["name"] = "match",
            ["title"] = "Match",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "In an answer about one model year: how the investigation's vehicle text reached that model.",
          },
          {
            ["name"] = "models",
            ["title"] = "Models",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "In an answer about one model year: the model names the investigation lists that reached it.",
          },
          {
            ["name"] = "open",
            ["title"] = "Open",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether it was opened in 2010 or later and has no day closed.",
          },
          {
            ["name"] = "opened",
            ["title"] = "Opened",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day it was opened.",
          },
          {
            ["name"] = "subject",
            ["title"] = "Subject",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's one-line subject.",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's summary.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_investigation",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/investigations",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "investigations",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "investigations",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2019_ram_1500",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "open",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_labor"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The newest day an estimate was changed.",
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "basis",
            ["title"] = "Basis",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`expert`: written by a person who does the work.",
          },
          {
            ["name"] = "class",
            ["title"] = "Class",
            ["type"] = "`$ANY`",
            ["short"] = "The class, for a class-scope figure.",
          },
          {
            ["name"] = "class_name",
            ["title"] = "Class Name",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The engine the vehicle id named, as an id form.",
          },
          {
            ["name"] = "estimates",
            ["title"] = "Estimates",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "One for each job that has a figure covering the vehicle, in the order of the job list.",
          },
          {
            ["name"] = "hours",
            ["title"] = "Hours",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Hours, as numbers of hours.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "job",
            ["title"] = "Job",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The job's id.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "\"An estimate, not a quote.",
          },
          {
            ["name"] = "notes",
            ["title"] = "Notes",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "sample",
            ["title"] = "Sample",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "scope",
            ["title"] = "Scope",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`.",
          },
          {
            ["name"] = "updated",
            ["title"] = "Updated",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The day the figure was last changed.",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The job's page on this site.",
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The model year an answer is about.",
          },
          {
            ["name"] = "years",
            ["title"] = "Years",
            ["type"] = "`$ANY`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_labor",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/labor",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "labor",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "labor",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/labor/{job}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "vehicle_id",
                  },
                  {
                    ["lit"] = "labor",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{vehicle_id}",
                  "labor",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "vehicle_id",
                    ["job"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "job",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "brake-pads-front",
                    },
                    {
                      ["name"] = "vehicle_id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "vehicle_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.vehicle",
            },
          },
        },
      },
      ["vehicle_recall"] = {
        ["fields"] = {
          {
            ["name"] = "built_from",
            ["title"] = "Built From",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "In an answer about one model year: the first and last build date the campaign gives.",
          },
          {
            ["name"] = "built_to",
            ["title"] = "Built To",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "campaign",
            ["title"] = "Campaign",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The publisher's campaign number.",
          },
          {
            ["name"] = "component",
            ["title"] = "Component",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The component, as the source words it.",
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`us` or `ca`.",
          },
          {
            ["name"] = "date",
            ["title"] = "Date",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The day the campaign was reported.",
          },
          {
            ["name"] = "do_not_drive",
            ["title"] = "Do Not Drive",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's advisory not to drive the vehicle until it is repaired.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "manufacturer",
            ["title"] = "Manufacturer",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "match",
            ["title"] = "Match",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "In an answer about one model year: how the campaign's vehicle text reached that model.",
          },
          {
            ["name"] = "mfr_campaign",
            ["title"] = "Mfr Campaign",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The manufacturer's own campaign number, which a dealer looks a recall up by.",
          },
          {
            ["name"] = "models",
            ["title"] = "Models",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "In an answer about one model year: the model names the campaign lists that reached it.",
          },
          {
            ["name"] = "notification",
            ["title"] = "Notification",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "Transport Canada's notification type, such as `Safety Mfr`.",
          },
          {
            ["name"] = "park_outside",
            ["title"] = "Park Outside",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
            ["short"] = "NHTSA's advisory to park outside, away from buildings.",
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Who published it: `nhtsa` or `tc` (Transport Canada).",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "What is wrong, in the source's words.",
          },
          {
            ["name"] = "units",
            ["title"] = "Units",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "Units potentially affected.",
            ["format"] = "int32",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The campaign's page on this site.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_recall",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/recalls",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "recalls",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "recalls",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "us",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_safety"] = {
        ["fields"] = {
          {
            ["name"] = "body_style",
            ["title"] = "Body Style",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "curb_weight_kg",
            ["title"] = "Curb Weight Kg",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "The weight of the vehicle NHTSA tested.",
            ["format"] = "int32",
          },
          {
            ["name"] = "curb_weight_lb",
            ["title"] = "Curb Weight Lb",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The vehicle NHTSA rated, in NHTSA's words, on one line.",
          },
          {
            ["name"] = "drive",
            ["title"] = "Drive",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "features",
            ["title"] = "Features",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The safety features NHTSA lists with a rating.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "match",
            ["title"] = "Match",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`.",
          },
          {
            ["name"] = "model",
            ["title"] = "Model",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The model, body style, vehicle type and drive as NHTSA words them.",
          },
          {
            ["name"] = "notes",
            ["title"] = "Notes",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover.",
          },
          {
            ["name"] = "release",
            ["title"] = "Release",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again.",
            ["format"] = "int32",
          },
          {
            ["name"] = "rollover_risk_percent",
            ["title"] = "Rollover Risk Percent",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
            ["short"] = "The chance of a rollover in a single-vehicle crash, in percent.",
            ["format"] = "double",
          },
          {
            ["name"] = "rollover_tip",
            ["title"] = "Rollover Tip",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
            ["short"] = "Whether the vehicle tipped up in NHTSA's dynamic test.",
          },
          {
            ["name"] = "stars",
            ["title"] = "Stars",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The stars of one rating, each from 1 to 5.",
          },
          {
            ["name"] = "vehicle_type",
            ["title"] = "Vehicle Type",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_safety",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/safety",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "safety",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "safety",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_spec"] = {
        ["fields"] = {
          {
            ["name"] = "battery_type",
            ["title"] = "Battery Type",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "battery_voltage",
            ["title"] = "Battery Voltage",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "confidence",
            ["title"] = "Confidence",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "`model`, `engine` or `submodel`, as on a fuel rating.",
          },
          {
            ["name"] = "cylinder_deactivation",
            ["title"] = "Cylinder Deactivation",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "cylinder_deactivation_name",
            ["title"] = "Cylinder Deactivation Name",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The maker's name for it, such as `Active Fuel Management`.",
          },
          {
            ["name"] = "described_as",
            ["title"] = "Described As",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "drive",
            ["title"] = "Drive",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "electrification",
            ["title"] = "Electrification",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`.",
          },
          {
            ["name"] = "emission_standards",
            ["title"] = "Emission Standards",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "ev_motor",
            ["title"] = "Ev Motor",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "exhaust_valves",
            ["title"] = "Exhaust Valves",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "fuel_grade",
            ["title"] = "Fuel Grade",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "fuel_usage",
            ["title"] = "Fuel Usage",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "Whether the grade is recommended or required, in EPA's words.",
          },
          {
            ["name"] = "gears",
            ["title"] = "Gears",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "intake_valves",
            ["title"] = "Intake Valves",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "Per cylinder.",
            ["format"] = "int32",
          },
          {
            ["name"] = "luggage_volume_ft3",
            ["title"] = "Luggage Volume Ft3",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "luggage_volume_l",
            ["title"] = "Luggage Volume L",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "motor_kw",
            ["title"] = "Motor Kw",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`.",
          },
          {
            ["name"] = "passenger_volume_ft3",
            ["title"] = "Passenger Volume Ft3",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "passenger_volume_l",
            ["title"] = "Passenger Volume L",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "size_class",
            ["title"] = "Size Class",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "source_id",
            ["title"] = "Source Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "start_stop",
            ["title"] = "Start Stop",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "supercharger",
            ["title"] = "Supercharger",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
          },
          {
            ["name"] = "transmission",
            ["title"] = "Transmission",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "transmission_type",
            ["title"] = "Transmission Type",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "turbo",
            ["title"] = "Turbo",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
          },
          {
            ["name"] = "variable_valve_lift",
            ["title"] = "Variable Valve Lift",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "variable_valve_timing",
            ["title"] = "Variable Valve Timing",
            ["type"] = {
              "`$ONE`",
              {
                "`$BOOLEAN`",
                "`$NULL`",
              },
            },
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_spec",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/specs",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "specs",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "specs",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle_tire"] = {
        ["fields"] = {
          {
            ["name"] = "bolt_pattern",
            ["title"] = "Bolt Pattern",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "checked",
            ["title"] = "Checked",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lug_torque_lbft",
            ["title"] = "Lug Torque Lbft",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int64",
          },
          {
            ["name"] = "lug_torque_nm",
            ["title"] = "Lug Torque Nm",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int64",
          },
          {
            ["name"] = "lug_torque_written_in",
            ["title"] = "Lug Torque Written In",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "`nm` or `lbft`.",
          },
          {
            ["name"] = "market",
            ["title"] = "Market",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "pressure_kpa",
            ["title"] = "Pressure Kpa",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "pressure_psi",
            ["title"] = "Pressure Psi",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "pressure_written_in",
            ["title"] = "Pressure Written In",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The unit the document printed: `kpa`, `bar` or `psi`.",
          },
          {
            ["name"] = "size",
            ["title"] = "Size",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The size as printed.",
          },
          {
            ["name"] = "size_rear",
            ["title"] = "Size Rear",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The rear size, only when it differs from the front.",
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "trims",
            ["title"] = "Trims",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The trims the document ties the size to, as it names them.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vehicle_tire",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vehicles/{id}/tires",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vehicles",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "tires",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vehicles",
                  "{id}",
                  "tires",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "2018_ford_f-150",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vin"] = {
        ["fields"] = {
          {
            ["name"] = "base_price_usd",
            ["title"] = "Base Price Usd",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
            ["short"] = "Manufacturer base price in US dollars, when NHTSA has one.",
            ["format"] = "double",
          },
          {
            ["name"] = "body",
            ["title"] = "Body",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "catalog",
            ["title"] = "Catalog",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "check_digit",
            ["title"] = "Check Digit",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "doors",
            ["title"] = "Doors",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "drivetrain",
            ["title"] = "Drivetrain",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "gvwr",
            ["title"] = "Gvwr",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "Gross vehicle weight rating class, as NHTSA words it.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "make",
            ["title"] = "Make",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "manufacturer",
            ["title"] = "Manufacturer",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "model",
            ["title"] = "Model",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "plant",
            ["title"] = "Plant",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Where the vehicle was built.",
          },
          {
            ["name"] = "recalls",
            ["title"] = "Recalls",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "safety",
            ["title"] = "Safety",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "seat_rows",
            ["title"] = "Seat Rows",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "seats",
            ["title"] = "Seats",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "series",
            ["title"] = "Series",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "transmission",
            ["title"] = "Transmission",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "transmission_speeds",
            ["title"] = "Transmission Speeds",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
          {
            ["name"] = "trim",
            ["title"] = "Trim",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "valid",
            ["title"] = "Valid",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether the check digit, position 9, is right.",
          },
          {
            ["name"] = "vin",
            ["title"] = "Vin",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Things to know about a decode that still succeeded.",
          },
          {
            ["name"] = "wheel_size_front",
            ["title"] = "Wheel Size Front",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "Front wheel diameter in inches.",
            ["format"] = "int32",
          },
          {
            ["name"] = "wheel_size_rear",
            ["title"] = "Wheel Size Rear",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["short"] = "Rear wheel diameter in inches.",
            ["format"] = "int32",
          },
          {
            ["name"] = "year",
            ["title"] = "Year",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
            ["format"] = "int32",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2023,
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vin_bulletin"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "bulletins",
            ["title"] = "Bulletins",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "counts",
            ["title"] = "Counts",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What the bulletins of one model year are, in numbers.",
          },
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What a VIN decoded to, as far as recalls need it.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "next_cursor",
            ["title"] = "Next Cursor",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin_bulletin",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/bulletins",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "bulletins",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                  "bulletins",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "code",
                      ["orig"] = "code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "P0420",
                    },
                    {
                      ["name"] = "component",
                      ["orig"] = "component",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "brakes",
                    },
                    {
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "noise",
                    },
                    {
                      ["name"] = "topic",
                      ["orig"] = "topic",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "warranty_extension",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2023,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vin_fluid"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "brake",
            ["title"] = "Brake",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "checked_as_of",
            ["title"] = "Checked As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "coolant",
            ["title"] = "Coolant",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What a VIN decoded to, as far as recalls need it.",
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "engine_oil",
            ["title"] = "Engine Oil",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "engine_oil_checked",
            ["title"] = "Engine Oil Checked",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Narrowed as `engine_oil` is.",
          },
          {
            ["name"] = "engine_settled",
            ["title"] = "Engine Settled",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether `engine_oil` is narrowed to `engine`.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "refrigerant",
            ["title"] = "Refrigerant",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "transmission",
            ["title"] = "Transmission",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin_fluid",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/fluids",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "fluids",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                  "fluids",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vin_fuel"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The day each country's fuel ratings were current.",
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What a VIN decoded to, as far as recalls need it.",
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "engine_settled",
            ["title"] = "Engine Settled",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether `ratings` is narrowed to `engine`.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ratings",
            ["title"] = "Ratings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin_fuel",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/fuel",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "fuel",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                  "fuel",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vin_labor"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "class",
            ["title"] = "Class",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What a VIN decoded to, as far as recalls need it.",
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "estimates",
            ["title"] = "Estimates",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin_labor",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/labor",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "labor",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                  "labor",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/labor/{job}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "vin_id",
                  },
                  {
                    ["lit"] = "labor",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{vin_id}",
                  "labor",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["job"] = "id",
                    ["vin"] = "vin_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "job",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "brake-pads-front",
                    },
                    {
                      ["name"] = "vin_id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "vin_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.vin",
            },
          },
        },
      },
      ["vin_recall"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The day each country's recall data was current.",
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What a VIN decoded to, as far as recalls need it.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lookup",
            ["title"] = "Lookup",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Where to check one vehicle for open recalls.",
          },
          {
            ["name"] = "may_apply",
            ["title"] = "May Apply",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Always `true`.",
          },
          {
            ["name"] = "recalls",
            ["title"] = "Recalls",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin_recall",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/recalls",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "recalls",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                  "recalls",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "us",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2023,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vin_spec"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What a VIN decoded to, as far as recalls need it.",
          },
          {
            ["name"] = "engine",
            ["title"] = "Engine",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "engine_settled",
            ["title"] = "Engine Settled",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Whether `specs` is narrowed to `engine`.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "specs",
            ["title"] = "Specs",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin_spec",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/specs",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "specs",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                  "specs",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vin_tire"] = {
        ["fields"] = {
          {
            ["name"] = "as_of",
            ["title"] = "As Of",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "attribution",
            ["title"] = "Attribution",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "What a VIN decoded to, as far as recalls need it.",
          },
          {
            ["name"] = "fitments",
            ["title"] = "Fitments",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Every fitment of the model year.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "vehicle",
            ["title"] = "Vehicle",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "warnings",
            ["title"] = "Warnings",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "vin_tire",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/vin/{vin}/tires",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "vin",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "tires",
                  },
                },
                ["parts"] = {
                  "v1",
                  "vin",
                  "{id}",
                  "tires",
                },
                ["rename"] = {
                  ["param"] = {
                    ["vin"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "vin",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "KM8K2CAB4PU001140",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
