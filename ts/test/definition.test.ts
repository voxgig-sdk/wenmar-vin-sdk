import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "batch",
    "accessor": "Batch",
    "op": "create",
    "method": "POST",
    "path": "/v1/vin/batch",
    "args": [],
    "select": {
      "include": "recalls"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "include"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "base_price_usd": 1,
        "body": "x",
        "check_digit": {
          "actual": "4",
          "expected": "4",
          "valid": true
        },
        "doors": 1,
        "drivetrain": "FWD",
        "gvwr": "x",
        "make": "Hyundai",
        "manufacturer": {
          "country": "x",
          "name": "Hyundai Motor Co",
          "vehicle_type": "x",
          "wmi": "KM8"
        },
        "model": "Kona",
        "plant": {
          "city": "x",
          "code": "U",
          "company": "x",
          "country": "x",
          "state": "x"
        },
        "seat_rows": 1,
        "seats": 1,
        "series": "x",
        "transmission": "x",
        "transmission_speeds": 1,
        "trim": "SE",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "warnings": [
          {
            "code": "invalid_check_digit",
            "message": "x",
            "suggestions": [
              "x"
            ]
          }
        ],
        "wheel_size_front": 1,
        "wheel_size_rear": 1,
        "year": 2023
      }
    ],
    "idField": "id"
  },
  {
    "entity": "bulletin",
    "accessor": "Bulletin",
    "op": "list",
    "method": "GET",
    "path": "/v1/bulletins",
    "args": [],
    "select": {
      "code": "P0420",
      "component": "brakes",
      "cursor": "v1",
      "limit": "v1",
      "make": "ford",
      "model": "f-150",
      "q": "noise",
      "topic": "v1",
      "type": "warranty_extension",
      "year": 2018
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "make",
      "model",
      "year",
      "type",
      "component",
      "code",
      "q",
      "topic",
      "limit",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "code",
        "wire": "code"
      },
      {
        "name": "component",
        "wire": "component"
      },
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "make",
        "wire": "make"
      },
      {
        "name": "model",
        "wire": "model"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "topic",
        "wire": "topic"
      },
      {
        "name": "type",
        "wire": "type"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "bulletins": [
        {
          "component": "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM",
          "date": "2018-11-02",
          "date_added": "2019-01-07",
          "document_id": "TSB 18-2324",
          "mfr_campaign": "x",
          "nhtsa_id": 10152456,
          "summary": "x",
          "type": "service_bulletin",
          "type_name": "Service bulletin",
          "url": "https://open.wenmarpro.com/bulletins/10152456"
        }
      ],
      "next_cursor": "x",
      "note": "x"
    },
    "idField": "id"
  },
  {
    "entity": "bulletin",
    "accessor": "Bulletin",
    "op": "load",
    "method": "GET",
    "path": "/v1/bulletins/{nhtsa_id}",
    "args": [
      {
        "name": "id",
        "wire": "nhtsa_id",
        "value": "10152456"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "codes": [
        "x"
      ],
      "component": "x",
      "components": [
        {
          "id": "brake-pad",
          "name": "Brake pads",
          "parent": "brakes"
        }
      ],
      "date": "x",
      "date_added": "x",
      "document_id": "x",
      "mfr_campaign": "x",
      "mfr_system": "x",
      "nhtsa_id": 10152456,
      "note": "x",
      "replaces": "x",
      "summary": "x",
      "topics": [
        "x"
      ],
      "type": "service_bulletin",
      "type_name": "x",
      "url": "x",
      "vehicles": [
        {
          "make": "FORD",
          "match": "x",
          "model": "F-150",
          "vehicle_ids": [
            "x"
          ],
          "year_from": 1,
          "year_to": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "code",
    "accessor": "Code",
    "op": "list",
    "method": "GET",
    "path": "/v1/codes",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": "v1",
      "q": "P04",
      "system": "powertrain/emissions"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "system",
      "limit",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "system",
        "wire": "system"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-10-12",
      "attribution": [
        "x"
      ],
      "codes": [
        {
          "code": "P0420",
          "system": "powertrain/emissions",
          "title": "x",
          "url": "https://open.wenmarpro.com/codes/P0420"
        }
      ],
      "next_cursor": "x",
      "note": "x"
    },
    "idField": "id"
  },
  {
    "entity": "code",
    "accessor": "Code",
    "op": "load",
    "method": "GET",
    "path": "/v1/codes/{code}",
    "args": [
      {
        "name": "id",
        "wire": "code",
        "value": "P0420"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "attribution": [
        "x"
      ],
      "checked": "2026-10-12",
      "checks": [
        "x"
      ],
      "code": "P0420",
      "common_causes": [
        "x"
      ],
      "components": [
        {
          "id": "oxygen-sensor",
          "name": "Oxygen sensor",
          "parent": "exhaust-emissions"
        }
      ],
      "generic": true,
      "meaning": "x",
      "note": "x",
      "related": [
        {
          "code": "P0420",
          "system": "powertrain/emissions",
          "title": "x",
          "url": "https://open.wenmarpro.com/codes/P0420"
        }
      ],
      "reviewer": "x",
      "system": "powertrain/emissions",
      "system_name": "Emission controls",
      "title": "x",
      "url": "https://open.wenmarpro.com/codes/P0420"
    },
    "idField": "id"
  },
  {
    "entity": "data",
    "accessor": "Data",
    "op": "load",
    "method": "GET",
    "path": "/v1/meta",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "built_at": "2026-10-01 04:25:57",
      "data_version": "2026.09",
      "datasets": {},
      "server_version": "0.2.0",
      "vpic_release": "vPICList_lite_2026_09"
    },
    "idField": "id"
  },
  {
    "entity": "engine",
    "accessor": "Engine",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/engines",
    "args": [],
    "select": {
      "make": "honda",
      "model": "civic",
      "year": 2019,
      "submodel": "si",
      "term": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "make",
      "model",
      "year",
      "submodel",
      "term"
    ],
    "queryArgs": [
      {
        "name": "make",
        "wire": "make"
      },
      {
        "name": "model",
        "wire": "model"
      },
      {
        "name": "submodel",
        "wire": "submodel"
      },
      {
        "name": "term",
        "wire": "term"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "3-5l-turbo-v6",
        "label": "3.5L Turbo V6",
        "preset": true,
        "vin8": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "entry",
    "accessor": "Entry",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/search",
    "args": [],
    "select": {
      "q": "2019 civic si",
      "limit": "v1",
      "scope": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "scope",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "scope",
        "wire": "scope"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "body": "x",
        "drive": "x",
        "engine": "x",
        "id": "2019_honda_civic_si",
        "make": "x",
        "model": "x",
        "submodel": "x",
        "summary": "2019 Honda Civic Si, Manual, FWD, Sedan",
        "transmission": "x",
        "vehicle_types": [
          "x"
        ],
        "year": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "entry",
    "accessor": "Entry",
    "op": "load",
    "method": "GET",
    "path": "/v1/vehicles/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2019_honda_civic_si"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "body": "x",
      "drive": "x",
      "engine": "x",
      "id": "2019_honda_civic_si",
      "make": "x",
      "model": "x",
      "submodel": "x",
      "summary": "2019 Honda Civic Si, Manual, FWD, Sedan",
      "transmission": "x",
      "vehicle_types": [
        "x"
      ],
      "year": 1
    },
    "idField": "id"
  },
  {
    "entity": "job",
    "accessor": "Job",
    "op": "list",
    "method": "GET",
    "path": "/v1/jobs",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-10-12",
      "attribution": [
        "x"
      ],
      "jobs": [
        {
          "id": "brake-pads-front",
          "name": "Replace front brake pads",
          "system": "brakes",
          "url": "https://open.wenmarpro.com/jobs/brake-pads-front"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "job",
    "accessor": "Job",
    "op": "load",
    "method": "GET",
    "path": "/v1/jobs/{job}",
    "args": [
      {
        "name": "id",
        "wire": "job",
        "value": "brake-pads-front"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "attribution": [
        "x"
      ],
      "components": [
        {
          "id": "brake-pad",
          "name": "Brake pads",
          "parent": "x"
        }
      ],
      "estimates": [
        {
          "basis": "expert",
          "class": "small-suv",
          "class_name": "Small SUV",
          "engine": "x",
          "hours": {
            "high": 1,
            "low": 1,
            "typical": 1
          },
          "job": "brake-pads-front",
          "name": "x",
          "notes": "x",
          "scope": "class",
          "updated": "2026-10-12",
          "url": "x"
        }
      ],
      "excludes": [
        "x"
      ],
      "id": "brake-pads-front",
      "includes": [
        "x"
      ],
      "name": "x",
      "note": "x",
      "related": [
        {
          "id": "brake-pads-front",
          "name": "Replace front brake pads",
          "system": "brakes",
          "url": "https://open.wenmarpro.com/jobs/brake-pads-front"
        }
      ],
      "system": "brakes",
      "system_name": "Brakes",
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "make",
    "accessor": "Make",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/makes",
    "args": [],
    "select": {
      "limit": "v1",
      "scope": "v1",
      "term": "v1",
      "year": 2019
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year",
      "scope",
      "term",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "scope",
        "wire": "scope"
      },
      {
        "name": "term",
        "wire": "term"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "mercedes-benz",
        "name": "Mercedes-Benz",
        "popular": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "make",
    "accessor": "Make",
    "op": "load",
    "method": "GET",
    "path": "/v1/makes/{make}",
    "args": [
      {
        "name": "id",
        "wire": "make",
        "value": "honda"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "honda",
      "name": "Honda",
      "popular": true
    },
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/models",
    "args": [],
    "select": {
      "make": "honda",
      "limit": "v1",
      "scope": "v1",
      "term": "v1",
      "year": 2019
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "make",
      "year",
      "scope",
      "term",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "make",
        "wire": "make"
      },
      {
        "name": "scope",
        "wire": "scope"
      },
      {
        "name": "term",
        "wire": "term"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "f-150",
        "name": "F-150",
        "year_from": 1,
        "year_to": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "load",
    "method": "GET",
    "path": "/v1/models/{make}/{model}",
    "args": [
      {
        "name": "make",
        "wire": "make",
        "value": "ford"
      },
      {
        "name": "model",
        "wire": "model",
        "value": "f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": {
        "ca": "2026-10-11",
        "us": "2026-10-11"
      },
      "attribution": [
        "x"
      ],
      "lookup": {
        "maker": "x",
        "nhtsa": "https://www.nhtsa.gov/recalls",
        "tc": "x"
      },
      "make": {
        "id": "ford",
        "name": "Ford"
      },
      "may_apply": true,
      "model": {
        "id": "ford",
        "name": "Ford"
      },
      "years": [
        {
          "bulletins": 1,
          "id": "2018_ford_f-150",
          "url": "https://open.wenmarpro.com/makes/ford/f-150/2018",
          "year": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "overview",
    "accessor": "Overview",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/overview",
    "args": [
      {
        "name": "vehicle_id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "attribution": [
        "x"
      ],
      "fluids": {},
      "fuel": {},
      "labor": {},
      "links": {
        "page": "https://open.wenmarpro.com/makes/ford/f-150/2018"
      },
      "specs": {},
      "tires": [
        {
          "bolt_pattern": "x",
          "checked": "2026-10-12",
          "lug_torque_lbft": 1,
          "lug_torque_nm": 1,
          "lug_torque_written_in": "x",
          "market": "x",
          "pressure_written_in": "x",
          "size": "x",
          "size_rear": "x",
          "source": "x",
          "trims": [
            "x"
          ]
        }
      ],
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "overview",
    "accessor": "Overview",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/overview",
    "args": [
      {
        "name": "vin_id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": 2023
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "attribution": [
        "x"
      ],
      "fluids": {},
      "fuel": {},
      "labor": {},
      "links": {
        "page": "https://open.wenmarpro.com/makes/ford/f-150/2018"
      },
      "specs": {},
      "tires": [
        {
          "bolt_pattern": "x",
          "checked": "2026-10-12",
          "lug_torque_lbft": 1,
          "lug_torque_nm": 1,
          "lug_torque_written_in": "x",
          "market": "x",
          "pressure_written_in": "x",
          "size": "x",
          "size_rear": "x",
          "source": "x",
          "trims": [
            "x"
          ]
        }
      ],
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "parts_card",
    "accessor": "PartsCard",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/parts-card",
    "args": [
      {
        "name": "vin_id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "attribution": [
        "x"
      ],
      "engine_settled": true,
      "lines": [
        {
          "label": "Engine",
          "source": "VIN decode (NHTSA vPIC)",
          "value": "2.0L"
        }
      ],
      "text": "x",
      "vin": "x",
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "payroll_deduction",
    "accessor": "PayrollDeduction",
    "op": "list",
    "method": "GET",
    "path": "/v1/payroll/deductions",
    "args": [],
    "select": {
      "federal_claim": "0",
      "frequency": "biweekly",
      "gross": "2400.00",
      "pay_date": "2026-07-15",
      "province": "ON",
      "provincial_claim": "0",
      "ytd_cpp": "0.00",
      "ytd_cpp2": "0.00",
      "ytd_ei": "0.00",
      "ytd_pensionable": "0.00"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "province",
      "frequency",
      "gross",
      "federal_claim",
      "provincial_claim",
      "pay_date",
      "ytd_cpp",
      "ytd_cpp2",
      "ytd_ei",
      "ytd_pensionable"
    ],
    "queryArgs": [
      {
        "name": "federal_claim",
        "wire": "federal_claim"
      },
      {
        "name": "frequency",
        "wire": "frequency"
      },
      {
        "name": "gross",
        "wire": "gross"
      },
      {
        "name": "pay_date",
        "wire": "pay_date"
      },
      {
        "name": "province",
        "wire": "province"
      },
      {
        "name": "provincial_claim",
        "wire": "provincial_claim"
      },
      {
        "name": "ytd_cpp",
        "wire": "ytd_cpp"
      },
      {
        "name": "ytd_cpp2",
        "wire": "ytd_cpp2"
      },
      {
        "name": "ytd_ei",
        "wire": "ytd_ei"
      },
      {
        "name": "ytd_pensionable",
        "wire": "ytd_pensionable"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "attribution": [
        "x"
      ],
      "edition": {
        "effective": "x",
        "number": 1,
        "title": "x",
        "url": "x",
        "valid_until": "x"
      },
      "employee": {
        "cpp": 1,
        "cpp2": 1,
        "ei": 1,
        "federal_tax": 1,
        "provincial_tax": 1,
        "total": 1,
        "total_tax": 1
      },
      "employer": {
        "cpp": 1,
        "cpp2": 1,
        "ei": 1,
        "total": 1
      },
      "factors": [
        {
          "meaning": "x",
          "name": "x",
          "value": 1
        }
      ],
      "federal_claim": {
        "amount": 1,
        "basic": true
      },
      "frequency": "biweekly",
      "gross": 2400,
      "net_pay": 1880.15,
      "note": "x",
      "pay_date": "2026-07-15",
      "pay_date_note": "x",
      "pdoc_url": "x",
      "periods_per_year": 26,
      "province": "ON",
      "provincial_claim": {
        "amount": 1,
        "basic": true
      },
      "year_to_date": {
        "cpp": 1,
        "cpp2": 1,
        "ei": 1,
        "pensionable": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "recall",
    "accessor": "Recall",
    "op": "list",
    "method": "GET",
    "path": "/v1/recalls",
    "args": [],
    "select": {
      "component": "air bags",
      "country": "v1",
      "cursor": "v1",
      "limit": "v1",
      "make": "ford",
      "model": "f-150",
      "q": "tailgate",
      "year": 2018
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "make",
      "model",
      "year",
      "component",
      "q",
      "country",
      "limit",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "component",
        "wire": "component"
      },
      {
        "name": "country",
        "wire": "country"
      },
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "make",
        "wire": "make"
      },
      {
        "name": "model",
        "wire": "model"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": {
        "ca": "2026-10-11",
        "us": "2026-10-11"
      },
      "attribution": [
        "x"
      ],
      "lookup": {
        "maker": "x",
        "nhtsa": "https://www.nhtsa.gov/recalls",
        "tc": "x"
      },
      "may_apply": true,
      "next_cursor": "x",
      "recalls": [
        {
          "built_from": "x",
          "built_to": "x",
          "campaign": "21V983000",
          "component": "LATCHES/LOCKS/LINKAGES:TAILGATE:LATCH",
          "country": "us",
          "date": "2021-12-16",
          "do_not_drive": true,
          "manufacturer": "x",
          "match": "exact",
          "mfr_campaign": "21S53",
          "models": [
            "x"
          ],
          "notification": "x",
          "park_outside": true,
          "source": "nhtsa",
          "summary": "x",
          "units": 1,
          "url": "https://open.wenmarpro.com/recalls/nhtsa/21V983000"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "recall",
    "accessor": "Recall",
    "op": "load",
    "method": "GET",
    "path": "/v1/recalls/{source}/{campaign}",
    "args": [
      {
        "name": "campaign",
        "wire": "campaign",
        "value": "19V888000"
      },
      {
        "name": "source",
        "wire": "source",
        "value": "nhtsa"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "campaign": "19V888000",
      "component": "x",
      "consequence": "x",
      "country": "us",
      "date": "x",
      "do_not_drive": true,
      "lookup": {
        "maker": "x",
        "nhtsa": "https://www.nhtsa.gov/recalls",
        "tc": "x"
      },
      "manufacturer": "x",
      "may_apply": true,
      "mfr_campaign": "x",
      "notes": "x",
      "notification": "x",
      "owner_notified": "x",
      "park_outside": true,
      "part_number": "x",
      "remedy": "x",
      "source": "nhtsa",
      "summary": "x",
      "units": 1,
      "url": "x",
      "vehicles": [
        {
          "built_from": "x",
          "built_to": "x",
          "make": "CHEVROLET",
          "match": "base",
          "model": "SILVERADO 1500",
          "vehicle_id": "2019_chevrolet_silverado",
          "year": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "recall_investigation",
    "accessor": "RecallInvestigation",
    "op": "list",
    "method": "GET",
    "path": "/v1/recalls/{source}/{campaign}/investigations",
    "args": [
      {
        "name": "campaign",
        "wire": "campaign",
        "value": "18V568000"
      },
      {
        "name": "recall_id",
        "wire": "source",
        "value": "nhtsa"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-10-12",
      "attribution": [
        "x"
      ],
      "campaign": "18V568000",
      "investigations": [
        {
          "action": "EA23001",
          "campaigns": [
            "x"
          ],
          "closed": "x",
          "component": "x",
          "kind": "EA",
          "kind_name": "Engineering analysis",
          "manufacturer": "x",
          "match": "exact",
          "models": [
            "x"
          ],
          "open": true,
          "opened": "2023-03-17",
          "subject": "High pressure fuel pump failure",
          "summary": "x"
        }
      ],
      "note": "x",
      "source": "nhtsa",
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "recent",
    "accessor": "Recent",
    "op": "list",
    "method": "GET",
    "path": "/v1/recalls/recent",
    "args": [],
    "select": {
      "country": "v1",
      "cursor": "v1",
      "limit": "v1",
      "make": "ford",
      "since": "2026-09-01"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "since",
      "country",
      "make",
      "limit",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      },
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "make",
        "wire": "make"
      },
      {
        "name": "since",
        "wire": "since"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": {
        "ca": "2026-10-11",
        "us": "2026-10-11"
      },
      "attribution": [
        "x"
      ],
      "lookup": {
        "maker": "x",
        "nhtsa": "https://www.nhtsa.gov/recalls",
        "tc": "x"
      },
      "may_apply": true,
      "next_cursor": "x",
      "recalls": [
        {
          "recall": {
            "built_from": "x",
            "built_to": "x",
            "campaign": "21V983000",
            "component": "LATCHES/LOCKS/LINKAGES:TAILGATE:LATCH",
            "country": "us",
            "date": "2021-12-16",
            "do_not_drive": true,
            "manufacturer": "x",
            "match": "exact",
            "mfr_campaign": "21S53",
            "models": [
              "x"
            ],
            "notification": "x",
            "park_outside": true,
            "source": "nhtsa",
            "summary": "x",
            "units": 1,
            "url": "https://open.wenmarpro.com/recalls/nhtsa/21V983000"
          },
          "vehicles": [
            {
              "built_from": "x",
              "built_to": "x",
              "make": "CHEVROLET",
              "match": "base",
              "model": "SILVERADO 1500",
              "vehicle_id": "2019_chevrolet_silverado",
              "year": 1
            }
          ],
          "vehicles_listed": 1
        }
      ],
      "since": "2026-09-01"
    },
    "idField": "id"
  },
  {
    "entity": "vehicle",
    "accessor": "Vehicle",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/years",
    "action": "year",
    "args": [],
    "select": {
      "scope": "v1",
      "term": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "scope",
      "term"
    ],
    "queryArgs": [
      {
        "name": "scope",
        "wire": "scope"
      },
      {
        "name": "term",
        "wire": "term"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      2027,
      2026,
      2025
    ],
    "idField": "id"
  },
  {
    "entity": "vehicle_bulletin",
    "accessor": "VehicleBulletin",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/bulletins",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {
      "code": "P0420",
      "component": "brakes",
      "cursor": "v1",
      "limit": "v1",
      "q": "noise",
      "topic": "maintenance",
      "type": "warranty_extension"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "type",
      "component",
      "code",
      "q",
      "topic",
      "limit",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "code",
        "wire": "code"
      },
      {
        "name": "component",
        "wire": "component"
      },
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "topic",
        "wire": "topic"
      },
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-10-11",
      "attribution": [
        "x"
      ],
      "bulletins": [
        {
          "component": "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM",
          "date": "2018-11-02",
          "date_added": "2019-01-07",
          "document_id": "TSB 18-2324",
          "mfr_campaign": "x",
          "nhtsa_id": 10152456,
          "summary": "x",
          "type": "service_bulletin",
          "type_name": "Service bulletin",
          "url": "https://open.wenmarpro.com/bulletins/10152456"
        }
      ],
      "counts": {
        "by_type": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ],
        "codes": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ],
        "components": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ],
        "count": 1,
        "topics": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ]
      },
      "next_cursor": "x",
      "note": "x",
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_code",
    "accessor": "VehicleCode",
    "op": "load",
    "method": "GET",
    "path": "/v1/vehicles/{id}/codes/{code}",
    "args": [
      {
        "name": "id",
        "wire": "code",
        "value": "P0420"
      },
      {
        "name": "vehicle_id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "attribution": [
        "x"
      ],
      "code": "P0420",
      "generic": true,
      "note": "x",
      "related": {
        "bulletins": [
          {
            "component": "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM",
            "date": "2018-11-02",
            "date_added": "2019-01-07",
            "document_id": "TSB 18-2324",
            "mfr_campaign": "x",
            "nhtsa_id": 10152456,
            "summary": "x",
            "type": "service_bulletin",
            "type_name": "Service bulletin",
            "url": "https://open.wenmarpro.com/bulletins/10152456"
          }
        ],
        "components": [
          {
            "id": "oxygen-sensor",
            "name": "Oxygen sensor",
            "parent": "exhaust-emissions"
          }
        ]
      },
      "url": "x",
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_complaint",
    "accessor": "VehicleComplaint",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/complaints",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2016_honda_civic"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-10-11",
      "attribution": [
        "x"
      ],
      "complaints": 1,
      "components": [
        {
          "complaints": 1,
          "crashes": 1,
          "fires": 1,
          "id": "steering",
          "injuries": 1,
          "median_km": 1,
          "median_miles": 1,
          "name": "Steering",
          "parent": "x"
        }
      ],
      "crashes": 1,
      "fires": 1,
      "injuries": 1,
      "median_km": 1,
      "median_miles": 1,
      "note": "x",
      "report_url": "x",
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      },
      "verified": true
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_fluid",
    "accessor": "VehicleFluid",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/fluids",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-09-29",
      "attribution": [
        "x"
      ],
      "brake": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "checked_as_of": "2026-10-12",
      "coolant": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "engine_oil": [
        {
          "as_written": [
            "5W30 GF-5"
          ],
          "confidence": "x",
          "cylinders": 1,
          "displacement_l": 1,
          "grades": [
            "5W-30"
          ],
          "source": "x"
        }
      ],
      "engine_oil_checked": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "refrigerant": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "transmission": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_fuel",
    "accessor": "VehicleFuel",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/fuel",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {
      "country": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": {
        "ca": "2026-10-06",
        "us": "2026-09-29"
      },
      "attribution": [
        "x"
      ],
      "ratings": [
        {
          "co2_g_km": 1,
          "confidence": "engine",
          "country": "us",
          "cylinders": 1,
          "described_as": "F150 Pickup 2WD",
          "displacement_l": 1,
          "drive": "Rear-Wheel Drive",
          "fuel_grade": "Regular Gasoline",
          "kwh_100km": 1,
          "match": "exact",
          "range_km": 1,
          "range_mi": 1,
          "second_fuel": "x",
          "source": "epa",
          "source_id": "39241",
          "transmission": "Automatic (S10)"
        }
      ],
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_investigation",
    "accessor": "VehicleInvestigation",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/investigations",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2019_ram_1500"
      }
    ],
    "select": {
      "status": "open"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "status"
    ],
    "queryArgs": [
      {
        "name": "status",
        "wire": "status"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-10-12",
      "attribution": [
        "x"
      ],
      "investigations": [
        {
          "action": "EA23001",
          "campaigns": [
            "x"
          ],
          "closed": "x",
          "component": "x",
          "kind": "EA",
          "kind_name": "Engineering analysis",
          "manufacturer": "x",
          "match": "exact",
          "models": [
            "x"
          ],
          "open": true,
          "opened": "2023-03-17",
          "subject": "High pressure fuel pump failure",
          "summary": "x"
        }
      ],
      "note": "x",
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_labor",
    "accessor": "VehicleLabor",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/labor",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "engine": "x",
      "estimates": [
        {
          "basis": "expert",
          "class": "small-suv",
          "class_name": "Small SUV",
          "engine": "x",
          "hours": {
            "high": 1,
            "low": 1,
            "typical": 1
          },
          "job": "brake-pads-front",
          "name": "x",
          "notes": "x",
          "scope": "class",
          "updated": "2026-10-12",
          "url": "x"
        }
      ],
      "note": "x",
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_labor",
    "accessor": "VehicleLabor",
    "op": "load",
    "method": "GET",
    "path": "/v1/vehicles/{id}/labor/{job}",
    "args": [
      {
        "name": "id",
        "wire": "job",
        "value": "brake-pads-front"
      },
      {
        "name": "vehicle_id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "engine": "x",
      "estimates": [
        {
          "basis": "expert",
          "class": "small-suv",
          "class_name": "Small SUV",
          "engine": "x",
          "hours": {
            "high": 1,
            "low": 1,
            "typical": 1
          },
          "job": "brake-pads-front",
          "name": "x",
          "notes": "x",
          "scope": "class",
          "updated": "2026-10-12",
          "url": "x"
        }
      ],
      "note": "x",
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_recall",
    "accessor": "VehicleRecall",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/recalls",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {
      "country": "us"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": {
        "ca": "2026-10-11",
        "us": "2026-10-11"
      },
      "attribution": [
        "x"
      ],
      "lookup": {
        "maker": "x",
        "nhtsa": "https://www.nhtsa.gov/recalls",
        "tc": "x"
      },
      "may_apply": true,
      "recalls": [
        {
          "built_from": "x",
          "built_to": "x",
          "campaign": "21V983000",
          "component": "LATCHES/LOCKS/LINKAGES:TAILGATE:LATCH",
          "country": "us",
          "date": "2021-12-16",
          "do_not_drive": true,
          "manufacturer": "x",
          "match": "exact",
          "mfr_campaign": "21S53",
          "models": [
            "x"
          ],
          "notification": "x",
          "park_outside": true,
          "source": "nhtsa",
          "summary": "x",
          "units": 1,
          "url": "https://open.wenmarpro.com/recalls/nhtsa/21V983000"
        }
      ],
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_safety",
    "accessor": "VehicleSafety",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/safety",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-08-07",
      "attribution": [
        "x"
      ],
      "ratings": [
        {
          "body_style": "PU/CC",
          "curb_weight_kg": 2295,
          "curb_weight_lb": 5060,
          "description": "F-150 SUPER CREW, PU/CC, 4x4",
          "drive": "4x4",
          "features": {
            "backup_camera": "x",
            "blind_spot_detection": "x",
            "crash_imminent_braking": "x",
            "crash_imminent_braking_evaluation": "x",
            "dynamic_brake_support": "x",
            "dynamic_brake_support_evaluation": "x",
            "esc": "standard",
            "forward_collision_warning": "x",
            "forward_collision_warning_evaluation": "meets",
            "head_side_airbag": "x",
            "lane_departure_warning": "x",
            "lane_departure_warning_evaluation": "x",
            "torso_side_airbag": "x"
          },
          "match": "base",
          "model": "F-150 SUPER CREW",
          "notes": [
            "x"
          ],
          "release": 1,
          "rollover_risk_percent": 19.1,
          "rollover_tip": true,
          "stars": {
            "frontal": 1,
            "frontal_driver": 1,
            "frontal_passenger": 1,
            "overall": 5,
            "rollover": 1,
            "side": 1,
            "side_barrier": 1,
            "side_driver": 1,
            "side_front_seat": 1,
            "side_passenger": 1,
            "side_pole": 1,
            "side_rear_seat": 1
          },
          "vehicle_type": "TRUCK"
        }
      ],
      "source": "NHTSA New Car Assessment Program",
      "source_url": "https://www.nhtsa.gov/ratings",
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_spec",
    "accessor": "VehicleSpec",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/specs",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-09-29",
      "attribution": [
        "x"
      ],
      "specs": [
        {
          "battery_type": "Lithium Ion",
          "battery_voltage": 1,
          "confidence": "x",
          "cylinder_deactivation": true,
          "cylinder_deactivation_name": "x",
          "described_as": "F150 Pickup 2WD",
          "drive": "x",
          "electrification": "x",
          "emission_standards": [
            {
              "engine_family": "JFMXT02.73JK",
              "sales_area": 3,
              "smog_score": 1,
              "standard": "T3B70",
              "standard_text": "Federal Tier 3 Bin 70"
            }
          ],
          "ev_motor": "x",
          "exhaust_valves": 1,
          "fuel_grade": "Regular Gasoline",
          "fuel_usage": "Gasoline (Premium Unleaded Required)",
          "gears": 1,
          "intake_valves": 1,
          "luggage_volume_ft3": 1,
          "luggage_volume_l": 1,
          "motor_kw": "x",
          "passenger_volume_ft3": 1,
          "passenger_volume_l": 1,
          "size_class": "Standard Pickup Trucks 2WD",
          "source": "epa",
          "source_id": "39241",
          "start_stop": true,
          "supercharger": true,
          "transmission": "x",
          "transmission_type": "Semi-Automatic",
          "turbo": true,
          "variable_valve_lift": true,
          "variable_valve_timing": true
        }
      ],
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle_tire",
    "accessor": "VehicleTire",
    "op": "list",
    "method": "GET",
    "path": "/v1/vehicles/{id}/tires",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "2018_ford_f-150"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "2026-10-12",
      "attribution": [
        "x"
      ],
      "fitments": [
        {
          "bolt_pattern": "x",
          "checked": "2026-10-12",
          "lug_torque_lbft": 1,
          "lug_torque_nm": 1,
          "lug_torque_written_in": "x",
          "market": "x",
          "pressure_written_in": "x",
          "size": "x",
          "size_rear": "x",
          "source": "x",
          "trims": [
            "x"
          ]
        }
      ],
      "vehicle": {
        "id": "2018_ford_f-150",
        "make": "Ford",
        "model": "F-150",
        "year": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "vin",
    "accessor": "Vin",
    "op": "load",
    "method": "GET",
    "path": "/v1/vin/{vin}",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": 2023
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "base_price_usd": 1,
      "body": "x",
      "check_digit": {
        "actual": "4",
        "expected": "4",
        "valid": true
      },
      "doors": 1,
      "drivetrain": "FWD",
      "gvwr": "x",
      "make": "Hyundai",
      "manufacturer": {
        "country": "x",
        "name": "Hyundai Motor Co",
        "vehicle_type": "x",
        "wmi": "KM8"
      },
      "model": "Kona",
      "plant": {
        "city": "x",
        "code": "U",
        "company": "x",
        "country": "x",
        "state": "x"
      },
      "seat_rows": 1,
      "seats": 1,
      "series": "x",
      "transmission": "x",
      "transmission_speeds": 1,
      "trim": "SE",
      "valid": true,
      "vin": "KM8K2CAB4PU001140",
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ],
      "wheel_size_front": 1,
      "wheel_size_rear": 1,
      "year": 2023
    },
    "idField": "id"
  },
  {
    "entity": "vin_bulletin",
    "accessor": "VinBulletin",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/bulletins",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "code": "P0420",
      "component": "brakes",
      "cursor": "v1",
      "limit": "v1",
      "q": "noise",
      "topic": "v1",
      "type": "warranty_extension",
      "year": 2023
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year",
      "type",
      "component",
      "code",
      "q",
      "topic",
      "limit",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "code",
        "wire": "code"
      },
      {
        "name": "component",
        "wire": "component"
      },
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "topic",
        "wire": "topic"
      },
      {
        "name": "type",
        "wire": "type"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "bulletins": [
        {
          "component": "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM",
          "date": "2018-11-02",
          "date_added": "2019-01-07",
          "document_id": "TSB 18-2324",
          "mfr_campaign": "x",
          "nhtsa_id": 10152456,
          "summary": "x",
          "type": "service_bulletin",
          "type_name": "Service bulletin",
          "url": "https://open.wenmarpro.com/bulletins/10152456"
        }
      ],
      "counts": {
        "by_type": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ],
        "codes": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ],
        "components": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ],
        "count": 1,
        "topics": [
          {
            "count": 1,
            "id": "brake-pad",
            "name": "Brake pads"
          }
        ]
      },
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "next_cursor": "x",
      "note": "x",
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "vin_fluid",
    "accessor": "VinFluid",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/fluids",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "brake": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "checked_as_of": "x",
      "coolant": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "engine_oil": [
        {
          "as_written": [
            "5W30 GF-5"
          ],
          "confidence": "x",
          "cylinders": 1,
          "displacement_l": 1,
          "grades": [
            "5W-30"
          ],
          "source": "x"
        }
      ],
      "engine_oil_checked": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "engine_settled": true,
      "refrigerant": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "transmission": [
        {
          "applies_to": "x",
          "capacity_l": 1,
          "capacity_qt": 1,
          "capacity_written_in": "x",
          "charge_g": 1,
          "charge_oz": 1,
          "charge_written_in": "x",
          "checked": "2026-10-12",
          "grade": "x",
          "market": "x",
          "source": "x",
          "specification": "x",
          "with_filter": true
        }
      ],
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "vin_fuel",
    "accessor": "VinFuel",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/fuel",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "country": "v1",
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country",
      "year"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": {
        "ca": "2026-10-06",
        "us": "2026-09-29"
      },
      "attribution": [
        "x"
      ],
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "engine_settled": true,
      "ratings": [
        {
          "co2_g_km": 1,
          "confidence": "engine",
          "country": "us",
          "cylinders": 1,
          "described_as": "F150 Pickup 2WD",
          "displacement_l": 1,
          "drive": "Rear-Wheel Drive",
          "fuel_grade": "Regular Gasoline",
          "kwh_100km": 1,
          "match": "exact",
          "range_km": 1,
          "range_mi": 1,
          "second_fuel": "x",
          "source": "epa",
          "source_id": "39241",
          "transmission": "Automatic (S10)"
        }
      ],
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "vin_labor",
    "accessor": "VinLabor",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/labor",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "engine": "x",
      "estimates": [
        {
          "basis": "expert",
          "class": "small-suv",
          "class_name": "Small SUV",
          "engine": "x",
          "hours": {
            "high": 1,
            "low": 1,
            "typical": 1
          },
          "job": "brake-pads-front",
          "name": "x",
          "notes": "x",
          "scope": "class",
          "updated": "2026-10-12",
          "url": "x"
        }
      ],
      "note": "x",
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "vin_labor",
    "accessor": "VinLabor",
    "op": "load",
    "method": "GET",
    "path": "/v1/vin/{vin}/labor/{job}",
    "args": [
      {
        "name": "id",
        "wire": "job",
        "value": "brake-pads-front"
      },
      {
        "name": "vin_id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "engine": "x",
      "estimates": [
        {
          "basis": "expert",
          "class": "small-suv",
          "class_name": "Small SUV",
          "engine": "x",
          "hours": {
            "high": 1,
            "low": 1,
            "typical": 1
          },
          "job": "brake-pads-front",
          "name": "x",
          "notes": "x",
          "scope": "class",
          "updated": "2026-10-12",
          "url": "x"
        }
      ],
      "note": "x",
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "vin_recall",
    "accessor": "VinRecall",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/recalls",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "country": "us",
      "year": 2023
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country",
      "year"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      },
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": {
        "ca": "2026-10-11",
        "us": "2026-10-11"
      },
      "attribution": [
        "x"
      ],
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "lookup": {
        "maker": "x",
        "nhtsa": "https://www.nhtsa.gov/recalls",
        "tc": "x"
      },
      "may_apply": true,
      "recalls": [
        {
          "built_from": "x",
          "built_to": "x",
          "campaign": "21V983000",
          "component": "LATCHES/LOCKS/LINKAGES:TAILGATE:LATCH",
          "country": "us",
          "date": "2021-12-16",
          "do_not_drive": true,
          "manufacturer": "x",
          "match": "exact",
          "mfr_campaign": "21S53",
          "models": [
            "x"
          ],
          "notification": "x",
          "park_outside": true,
          "source": "nhtsa",
          "summary": "x",
          "units": 1,
          "url": "https://open.wenmarpro.com/recalls/nhtsa/21V983000"
        }
      ],
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "vin_spec",
    "accessor": "VinSpec",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/specs",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "engine_settled": true,
      "specs": [
        {
          "battery_type": "Lithium Ion",
          "battery_voltage": 1,
          "confidence": "x",
          "cylinder_deactivation": true,
          "cylinder_deactivation_name": "x",
          "described_as": "F150 Pickup 2WD",
          "drive": "x",
          "electrification": "x",
          "emission_standards": [
            {
              "engine_family": "JFMXT02.73JK",
              "sales_area": 3,
              "smog_score": 1,
              "standard": "T3B70",
              "standard_text": "Federal Tier 3 Bin 70"
            }
          ],
          "ev_motor": "x",
          "exhaust_valves": 1,
          "fuel_grade": "Regular Gasoline",
          "fuel_usage": "Gasoline (Premium Unleaded Required)",
          "gears": 1,
          "intake_valves": 1,
          "luggage_volume_ft3": 1,
          "luggage_volume_l": 1,
          "motor_kw": "x",
          "passenger_volume_ft3": 1,
          "passenger_volume_l": 1,
          "size_class": "Standard Pickup Trucks 2WD",
          "source": "epa",
          "source_id": "39241",
          "start_stop": true,
          "supercharger": true,
          "transmission": "x",
          "transmission_type": "Semi-Automatic",
          "turbo": true,
          "variable_valve_lift": true,
          "variable_valve_timing": true
        }
      ],
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "vin_tire",
    "accessor": "VinTire",
    "op": "list",
    "method": "GET",
    "path": "/v1/vin/{vin}/tires",
    "args": [
      {
        "name": "id",
        "wire": "vin",
        "value": "KM8K2CAB4PU001140"
      }
    ],
    "select": {
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "as_of": "x",
      "attribution": [
        "x"
      ],
      "decode": {
        "make": "x",
        "model": "x",
        "trim": "x",
        "valid": true,
        "vin": "KM8K2CAB4PU001140",
        "year": 1
      },
      "fitments": [
        {
          "bolt_pattern": "x",
          "checked": "2026-10-12",
          "lug_torque_lbft": 1,
          "lug_torque_nm": 1,
          "lug_torque_written_in": "x",
          "market": "x",
          "pressure_written_in": "x",
          "size": "x",
          "size_rear": "x",
          "source": "x",
          "trims": [
            "x"
          ]
        }
      ],
      "warnings": [
        {
          "code": "invalid_check_digit",
          "message": "x",
          "suggestions": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
