package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WenmarVin",
			"slug": "wenmar-vin",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://open.wenmarpro.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"batch": map[string]any{},
				"bulletin": map[string]any{},
				"code": map[string]any{},
				"data": map[string]any{},
				"engine": map[string]any{},
				"entry": map[string]any{},
				"job": map[string]any{},
				"make": map[string]any{},
				"model": map[string]any{},
				"overview": map[string]any{},
				"parts_card": map[string]any{},
				"payroll_deduction": map[string]any{},
				"recall": map[string]any{},
				"recall_investigation": map[string]any{},
				"recent": map[string]any{},
				"submodel": map[string]any{},
				"vehicle": map[string]any{},
				"vehicle_bulletin": map[string]any{},
				"vehicle_code": map[string]any{},
				"vehicle_complaint": map[string]any{},
				"vehicle_fluid": map[string]any{},
				"vehicle_fuel": map[string]any{},
				"vehicle_investigation": map[string]any{},
				"vehicle_labor": map[string]any{},
				"vehicle_recall": map[string]any{},
				"vehicle_safety": map[string]any{},
				"vehicle_spec": map[string]any{},
				"vehicle_tire": map[string]any{},
				"vin": map[string]any{},
				"vin_bulletin": map[string]any{},
				"vin_fluid": map[string]any{},
				"vin_fuel": map[string]any{},
				"vin_labor": map[string]any{},
				"vin_recall": map[string]any{},
				"vin_spec": map[string]any{},
				"vin_tire": map[string]any{},
			},
		},
		"entity": map[string]any{
			"batch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "vins",
						"title": "Vins",
						"type": "`$ARRAY`",
						"req": true,
						"short": "At most 50 VINs.",
					},
				},
				"name": "batch",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/vin/batch",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"lit": "batch",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"batch",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
											"example": "recalls",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bulletin": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "codes",
						"title": "Codes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The trouble codes the summary names.",
					},
					map[string]any{
						"name": "component",
						"title": "Component",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's components, in its words, separated by `; `.",
					},
					map[string]any{
						"name": "components",
						"title": "Components",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The components it is about, systems first.",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's own date.",
					},
					map[string]any{
						"name": "date_added",
						"title": "Date Added",
						"type": "`$STRING`",
						"req": true,
						"short": "The day NHTSA published it.",
					},
					map[string]any{
						"name": "document",
						"title": "Document",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "document_id",
						"title": "Document Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's own number for the document, which a dealer looks it up by.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mfr_campaign",
						"title": "Mfr Campaign",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's campaign id or software version.",
					},
					map[string]any{
						"name": "mfr_system",
						"title": "Mfr System",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's own words for the system.",
					},
					map[string]any{
						"name": "nhtsa_id",
						"title": "Nhtsa Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "NHTSA's id number for the communication.",
						"format": "int64",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "replaces",
						"title": "Replaces",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The number of the bulletin this one replaces.",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's summary of the communication.",
					},
					map[string]any{
						"name": "topics",
						"title": "Topics",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "`service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`.",
					},
					map[string]any{
						"name": "type_name",
						"title": "Type Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The type in words.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The bulletin's page on this site.",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "bulletin",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/bulletins",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "bulletins",
									},
								},
								"parts": []any{
									"v1",
									"bulletins",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "code",
											"orig": "code",
											"type": "`$STRING`",
											"kind": "query",
											"example": "P0420",
										},
										map[string]any{
											"name": "component",
											"orig": "component",
											"type": "`$STRING`",
											"kind": "query",
											"example": "brakes",
											"field": true,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"example": "ford",
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"example": "f-150",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"example": "noise",
										},
										map[string]any{
											"name": "topic",
											"orig": "topic",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "warranty_extension",
											"field": true,
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2018,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/bulletins/{nhtsa_id}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "bulletins",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"bulletins",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"nhtsa_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "nhtsa_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "10152456",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"code": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The credit lines the data's licences ask for.",
					},
					map[string]any{
						"name": "checked",
						"title": "Checked",
						"type": "`$STRING`",
						"req": true,
						"short": "The day it was approved.",
					},
					map[string]any{
						"name": "checks",
						"title": "Checks",
						"type": "`$ARRAY`",
						"req": true,
						"short": "What a technician usually verifies first.",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "common_causes",
						"title": "Common Causes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "General causes, not about one make.",
					},
					map[string]any{
						"name": "components",
						"title": "Components",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "generic",
						"title": "Generic",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Always `true` here: only codes every maker uses the same way are described.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meaning",
						"title": "Meaning",
						"type": "`$STRING`",
						"req": true,
						"short": "What the code tells a service advisor.",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
						"short": "What a description is and is not.",
					},
					map[string]any{
						"name": "related",
						"title": "Related",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Related codes that are described too.",
					},
					map[string]any{
						"name": "reviewer",
						"title": "Reviewer",
						"type": "`$STRING`",
						"req": true,
						"short": "The GitHub name of the person who approved the text.",
					},
					map[string]any{
						"name": "system",
						"title": "System",
						"type": "`$STRING`",
						"req": true,
						"short": "Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it.",
					},
					map[string]any{
						"name": "system_name",
						"title": "System Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The code's page on this site.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "code",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/codes",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "codes",
									},
								},
								"parts": []any{
									"v1",
									"codes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"example": "P04",
										},
										map[string]any{
											"name": "system",
											"orig": "system",
											"type": "`$STRING`",
											"kind": "query",
											"example": "powertrain/emissions",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/codes/{code}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "codes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"codes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"code": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "P0420",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"data": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "built_at",
						"title": "Built At",
						"type": "`$STRING`",
						"req": true,
						"short": "When the data file was built, in UTC.",
					},
					map[string]any{
						"name": "data_version",
						"title": "Data Version",
						"type": "`$STRING`",
						"req": true,
						"short": "The data release, such as `2026.09`.",
					},
					map[string]any{
						"name": "datasets",
						"title": "Datasets",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The datasets served beside the catalog, such as `recalls_us`, by id.",
					},
					map[string]any{
						"name": "server_version",
						"title": "Server Version",
						"type": "`$STRING`",
						"req": true,
						"short": "The version of the server.",
					},
					map[string]any{
						"name": "vpic_release",
						"title": "Vpic Release",
						"type": "`$STRING`",
						"req": true,
						"short": "The NHTSA vPIC release the data was built from.",
					},
				},
				"name": "data",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/meta",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "meta",
									},
								},
								"parts": []any{
									"v1",
									"meta",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"engine": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "preset",
						"title": "Preset",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the engine comes from this project's list instead of NHTSA.",
					},
					map[string]any{
						"name": "vin8",
						"title": "Vin8",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "engine",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/engines",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"lit": "engines",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"engines",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "honda",
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "civic",
										},
										map[string]any{
											"name": "submodel",
											"orig": "submodel",
											"type": "`$STRING`",
											"kind": "query",
											"example": "si",
										},
										map[string]any{
											"name": "term",
											"orig": "term",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 2019,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"make",
										"model",
										"year",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"entry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "body",
						"title": "Body",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "drive",
						"title": "Drive",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The stable id.",
					},
					map[string]any{
						"name": "make",
						"title": "Make",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "submodel",
						"title": "Submodel",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
						"req": true,
						"short": "One line naming everything above that is known.",
					},
					map[string]any{
						"name": "transmission",
						"title": "Transmission",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "vehicle_types",
						"title": "Vehicle Types",
						"type": "`$ARRAY`",
						"req": true,
						"short": "NHTSA's vehicle types for this model year, such as `Truck`.",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int32",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "entry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/search",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2019 civic si",
										},
										map[string]any{
											"name": "scope",
											"orig": "scope",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2019_honda_civic_si",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"job": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The credit the labour estimates ask for.",
					},
					map[string]any{
						"name": "components",
						"title": "Components",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "estimates",
						"title": "Estimates",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$ARRAY`",
								"`$NULL`",
							},
						},
						"short": "The job's class-scope figures.",
					},
					map[string]any{
						"name": "excludes",
						"title": "Excludes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Work often done at the same visit that is not part of this job.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The job's id.",
					},
					map[string]any{
						"name": "includes",
						"title": "Includes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The work the job covers.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
						"short": "What an estimate is not.",
					},
					map[string]any{
						"name": "related",
						"title": "Related",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "system",
						"title": "System",
						"type": "`$STRING`",
						"req": true,
						"short": "The id of the system the job belongs to.",
					},
					map[string]any{
						"name": "system_name",
						"title": "System Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The job's page on this site.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "job",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/jobs",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"v1",
									"jobs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/jobs/{job}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "jobs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"jobs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"job": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "job",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "brake-pads-front",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"make": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The make's id form.",
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "popular",
						"title": "Popular",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether it is on the list of popular makes.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "make",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/makes",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"lit": "makes",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"makes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "scope",
											"orig": "scope",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "term",
											"orig": "term",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2019,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/makes/{make}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "makes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"makes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"make": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "honda",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The day each country's recall data was current.",
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The model's id form.",
					},
					map[string]any{
						"name": "lookup",
						"title": "Lookup",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Where to check one vehicle for open recalls.",
					},
					map[string]any{
						"name": "make",
						"title": "Make",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A make or a model: its id form and its name.",
					},
					map[string]any{
						"name": "may_apply",
						"title": "May Apply",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Always `true`: a recall count is of campaigns that may apply to the model year.",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A make or a model: its id form and its name.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "year_from",
						"title": "Year From",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The first and last model year the model exists in.",
						"format": "int32",
					},
					map[string]any{
						"name": "year_to",
						"title": "Year To",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int32",
					},
					map[string]any{
						"name": "years",
						"title": "Years",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"make": "make.name",
						"model": "model.name",
					},
					"name": "id",
					"parts": []any{
						"make",
						"model",
					},
					"sep": "/",
				},
				"name": "model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/models",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"lit": "models",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"models",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "honda",
											"field": true,
										},
										map[string]any{
											"name": "scope",
											"orig": "scope",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "term",
											"orig": "term",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2019,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"make",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/models/{make}/{model}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "models",
									},
									map[string]any{
										"var": "make",
									},
									map[string]any{
										"var": "model",
									},
								},
								"parts": []any{
									"v1",
									"models",
									"{make}",
									"{model}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "ford",
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"make",
										"model",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"overview": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
						"short": "`invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`.",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "suggestions",
						"title": "Suggestions",
						"type": "`$ARRAY`",
						"short": "VINs the caller may have meant.",
					},
				},
				"name": "overview",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/overview",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "vehicle_id",
									},
									map[string]any{
										"lit": "overview",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{vehicle_id}",
									"overview",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "vehicle_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "vehicle_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"vehicle_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/overview",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "vin_id",
									},
									map[string]any{
										"lit": "overview",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{vin_id}",
									"overview",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "vin_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "vin_id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2023,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"vin_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.vehicle",
						},
						[]any{
							"$.main.kit.entity.vin",
						},
					},
				},
			},
			"parts_card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "engine_settled",
						"title": "Engine Settled",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the decode settled one catalog engine.",
					},
					map[string]any{
						"name": "lines",
						"title": "Lines",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
						"short": "The lines as plain text, one `Label: value` each.",
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "vin",
						"title": "Vin",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "parts_card",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/parts-card",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "vin_id",
									},
									map[string]any{
										"lit": "parts-card",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{vin_id}",
									"parts-card",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "vin_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "vin_id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"vin_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.vin",
						},
					},
				},
			},
			"payroll_deduction": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meaning",
						"title": "Meaning",
						"type": "`$STRING`",
						"req": true,
						"short": "What the factor means.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name the engine gives the factor.",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$NUMBER`",
						"req": true,
						"short": "The value used, after rounding.",
						"format": "double",
					},
				},
				"name": "payroll_deduction",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/payroll/deductions",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "payroll",
									},
									map[string]any{
										"lit": "deductions",
									},
								},
								"parts": []any{
									"v1",
									"payroll",
									"deductions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "federal_claim",
											"orig": "federal_claim",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0",
										},
										map[string]any{
											"name": "frequency",
											"orig": "frequency",
											"type": "`$STRING`",
											"kind": "query",
											"example": "biweekly",
										},
										map[string]any{
											"name": "gross",
											"orig": "gross",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2400.00",
										},
										map[string]any{
											"name": "pay_date",
											"orig": "pay_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2026-07-15",
										},
										map[string]any{
											"name": "province",
											"orig": "province",
											"type": "`$STRING`",
											"kind": "query",
											"example": "ON",
										},
										map[string]any{
											"name": "provincial_claim",
											"orig": "provincial_claim",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0",
										},
										map[string]any{
											"name": "ytd_cpp",
											"orig": "ytd_cpp",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0.00",
										},
										map[string]any{
											"name": "ytd_cpp2",
											"orig": "ytd_cpp2",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0.00",
										},
										map[string]any{
											"name": "ytd_ei",
											"orig": "ytd_ei",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0.00",
										},
										map[string]any{
											"name": "ytd_pensionable",
											"orig": "ytd_pensionable",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0.00",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"recall": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day this publisher's data was current.",
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "built_from",
						"title": "Built From",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "In an answer about one model year: the first and last build date the campaign gives.",
					},
					map[string]any{
						"name": "built_to",
						"title": "Built To",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "campaign",
						"title": "Campaign",
						"type": "`$STRING`",
						"req": true,
						"short": "The publisher's campaign number.",
					},
					map[string]any{
						"name": "completion",
						"title": "Completion",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "component",
						"title": "Component",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The component, as the source words it.",
					},
					map[string]any{
						"name": "consequence",
						"title": "Consequence",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
						"short": "`us` or `ca`.",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day the campaign was reported.",
					},
					map[string]any{
						"name": "do_not_drive",
						"title": "Do Not Drive",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's advisory not to drive the vehicle until it is repaired.",
					},
					map[string]any{
						"name": "french",
						"title": "French",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lookup",
						"title": "Lookup",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Where to check one vehicle for open recalls.",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "In an answer about one model year: how the campaign's vehicle text reached that model.",
					},
					map[string]any{
						"name": "may_apply",
						"title": "May Apply",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Always `true`: the campaign may apply to a vehicle it lists.",
					},
					map[string]any{
						"name": "mfr_campaign",
						"title": "Mfr Campaign",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's own campaign number, which a dealer looks a recall up by.",
					},
					map[string]any{
						"name": "models",
						"title": "Models",
						"type": "`$ARRAY`",
						"req": true,
						"short": "In an answer about one model year: the model names the campaign lists that reached it.",
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "notification",
						"title": "Notification",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Transport Canada's notification type, such as `Safety Mfr`.",
					},
					map[string]any{
						"name": "owner_notified",
						"title": "Owner Notified",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day owners were notified.",
					},
					map[string]any{
						"name": "park_outside",
						"title": "Park Outside",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's advisory to park outside, away from buildings.",
					},
					map[string]any{
						"name": "part_number",
						"title": "Part Number",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's part numbers, separated by commas.",
					},
					map[string]any{
						"name": "remedy",
						"title": "Remedy",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
						"short": "Who published it: `nhtsa` or `tc` (Transport Canada).",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "What is wrong, in the source's words.",
					},
					map[string]any{
						"name": "units",
						"title": "Units",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Units potentially affected.",
						"format": "int32",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The campaign's page on this site.",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Every vehicle the campaign lists, by make, model and year.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"campaign": "campaign",
						"source": "source",
					},
					"name": "id",
					"parts": []any{
						"source",
						"campaign",
					},
					"sep": "/",
				},
				"name": "recall",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/recalls",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "recalls",
									},
								},
								"parts": []any{
									"v1",
									"recalls",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "component",
											"orig": "component",
											"type": "`$STRING`",
											"kind": "query",
											"example": "air bags",
											"field": true,
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"example": "ford",
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"example": "f-150",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"example": "tailgate",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2018,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/recalls/{source}/{campaign}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "recalls",
									},
									map[string]any{
										"var": "source",
									},
									map[string]any{
										"var": "campaign",
									},
								},
								"parts": []any{
									"v1",
									"recalls",
									"{source}",
									"{campaign}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "campaign",
											"orig": "campaign",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "19V888000",
										},
										map[string]any{
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "nhtsa",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"campaign",
										"source",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"recall_investigation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "action",
						"title": "Action",
						"type": "`$STRING`",
						"req": true,
						"short": "NHTSA's action number.",
					},
					map[string]any{
						"name": "campaigns",
						"title": "Campaigns",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The recall campaigns it led to, as NHTSA numbers them.",
					},
					map[string]any{
						"name": "closed",
						"title": "Closed",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day it was closed.",
					},
					map[string]any{
						"name": "component",
						"title": "Component",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The components it names, as NHTSA words them, separated by `; `.",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "The letters the number starts with.",
					},
					map[string]any{
						"name": "kind_name",
						"title": "Kind Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The kind in words.",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturers it names, separated by `; `.",
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "In an answer about one model year: how the investigation's vehicle text reached that model.",
					},
					map[string]any{
						"name": "models",
						"title": "Models",
						"type": "`$ARRAY`",
						"req": true,
						"short": "In an answer about one model year: the model names the investigation lists that reached it.",
					},
					map[string]any{
						"name": "open",
						"title": "Open",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether it was opened in 2010 or later and has no day closed.",
					},
					map[string]any{
						"name": "opened",
						"title": "Opened",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day it was opened.",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's one-line subject.",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's summary.",
					},
				},
				"name": "recall_investigation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/recalls/{source}/{campaign}/investigations",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "recalls",
									},
									map[string]any{
										"var": "recall_id",
									},
									map[string]any{
										"var": "campaign",
									},
									map[string]any{
										"lit": "investigations",
									},
								},
								"parts": []any{
									"v1",
									"recalls",
									"{recall_id}",
									"{campaign}",
									"investigations",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"source": "recall_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "campaign",
											"orig": "campaign",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "18V568000",
										},
										map[string]any{
											"name": "recall_id",
											"orig": "source",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "nhtsa",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"campaign",
										"recall_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.recall",
						},
					},
				},
			},
			"recent": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "recall",
						"title": "Recall",
						"type": "`$OBJECT`",
						"req": true,
						"short": "One recall campaign in a list.",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The vehicles the campaign lists: at most 200 of them.",
					},
					map[string]any{
						"name": "vehicles_listed",
						"title": "Vehicles Listed",
						"type": "`$INTEGER`",
						"req": true,
						"short": "How many vehicles the campaign lists in all.",
						"format": "int32",
					},
				},
				"name": "recent",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/recalls/recent",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "recalls",
									},
									map[string]any{
										"lit": "recent",
									},
								},
								"parts": []any{
									"v1",
									"recalls",
									"recent",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"example": "ford",
										},
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2026-09-01",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"submodel": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "`trim` or `series` as NHTSA has it, or `preset` from this project's own list.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "submodel",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/submodels",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"lit": "submodels",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"submodels",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "honda",
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "civic",
										},
										map[string]any{
											"name": "term",
											"orig": "term",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 2019,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"make",
										"model",
										"year",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/trims",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"lit": "trims",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"trims",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "honda",
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "civic",
										},
										map[string]any{
											"name": "term",
											"orig": "term",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 2019,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"make",
										"model",
										"year",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle": map[string]any{
				"fields": []any{},
				"name": "vehicle",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/years",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"lit": "years",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"years",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "scope",
											"orig": "scope",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "term",
											"orig": "term",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "year",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_bulletin": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "component",
						"title": "Component",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's components, in its words, separated by `; `.",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's own date.",
					},
					map[string]any{
						"name": "date_added",
						"title": "Date Added",
						"type": "`$STRING`",
						"req": true,
						"short": "The day NHTSA published it.",
					},
					map[string]any{
						"name": "document",
						"title": "Document",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "document_id",
						"title": "Document Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's own number for the document, which a dealer looks it up by.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mfr_campaign",
						"title": "Mfr Campaign",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's campaign id or software version.",
					},
					map[string]any{
						"name": "nhtsa_id",
						"title": "Nhtsa Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "NHTSA's id number for the communication.",
						"format": "int64",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's summary of the communication.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "`service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`.",
					},
					map[string]any{
						"name": "type_name",
						"title": "Type Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The type in words.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The bulletin's page on this site.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_bulletin",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/bulletins",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "bulletins",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"bulletins",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
									"query": []any{
										map[string]any{
											"name": "code",
											"orig": "code",
											"type": "`$STRING`",
											"kind": "query",
											"example": "P0420",
										},
										map[string]any{
											"name": "component",
											"orig": "component",
											"type": "`$STRING`",
											"kind": "query",
											"example": "brakes",
											"field": true,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"example": "noise",
										},
										map[string]any{
											"name": "topic",
											"orig": "topic",
											"type": "`$STRING`",
											"kind": "query",
											"example": "maintenance",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "warranty_extension",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_code": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "bulletins",
						"title": "Bulletins",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "generic",
						"title": "Generic",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether every maker uses the code the same way.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "related",
						"title": "Related",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What else is held for the model year about the components a code concerns.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The page of this code on this model year.",
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The model year an answer is about.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_code",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/codes/{code}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "vehicle_id",
									},
									map[string]any{
										"lit": "codes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{vehicle_id}",
									"codes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"code": "id",
										"id": "vehicle_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "P0420",
										},
										map[string]any{
											"name": "vehicle_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"vehicle_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.vehicle",
						},
					},
				},
			},
			"vehicle_complaint": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "complaints",
						"title": "Complaints",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int32",
					},
					map[string]any{
						"name": "crashes",
						"title": "Crashes",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Complaints that report a crash.",
						"format": "int32",
					},
					map[string]any{
						"name": "fires",
						"title": "Fires",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Complaints that report a fire.",
						"format": "int32",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A component id, such as `steering` or `brake-pad`.",
					},
					map[string]any{
						"name": "injuries",
						"title": "Injuries",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Complaints that report at least one person injured.",
						"format": "int32",
					},
					map[string]any{
						"name": "median_km",
						"title": "Median Km",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "The median of the mileages owners gave, in kilometres.",
						"format": "int32",
					},
					map[string]any{
						"name": "median_miles",
						"title": "Median Miles",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "The same in miles, as NHTSA records it.",
						"format": "int32",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "parent",
						"title": "Parent",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The system a part belongs to.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_complaint",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/complaints",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "complaints",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"complaints",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2016_honda_civic",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_fluid": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day EPA's oil grades were current.",
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "brake",
						"title": "Brake",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "checked_as_of",
						"title": "Checked As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day of the newest hand-read record the server holds, for any vehicle.",
					},
					map[string]any{
						"name": "coolant",
						"title": "Coolant",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "engine_oil",
						"title": "Engine Oil",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "engine_oil_checked",
						"title": "Engine Oil Checked",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "refrigerant",
						"title": "Refrigerant",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "transmission",
						"title": "Transmission",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The model year an answer is about.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_fluid",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/fluids",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "fluids",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"fluids",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_fuel": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "co2_g_km",
						"title": "Co2 G Km",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Tailpipe carbon dioxide, combined.",
						"format": "int32",
					},
					map[string]any{
						"name": "confidence",
						"title": "Confidence",
						"type": "`$STRING`",
						"req": true,
						"short": "How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim).",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
						"short": "`us` or `ca`.",
					},
					map[string]any{
						"name": "cylinders",
						"title": "Cylinders",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "described_as",
						"title": "Described As",
						"type": "`$STRING`",
						"req": true,
						"short": "The source's own name for the vehicle rated.",
					},
					map[string]any{
						"name": "displacement_l",
						"title": "Displacement L",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"format": "double",
					},
					map[string]any{
						"name": "drive",
						"title": "Drive",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "fuel_grade",
						"title": "Fuel Grade",
						"type": "`$STRING`",
						"req": true,
						"short": "The fuel the figures are for, which is the recommended grade.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kwh_100km",
						"title": "Kwh 100km",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"short": "Combined electricity use.",
						"format": "double",
					},
					map[string]any{
						"name": "l_100km",
						"title": "L 100km",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": "`$STRING`",
						"req": true,
						"short": "How the model was found: `exact`, `base` or `curated`.",
					},
					map[string]any{
						"name": "mpg",
						"title": "Mpg",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "range_km",
						"title": "Range Km",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "On a full battery.",
						"format": "int32",
					},
					map[string]any{
						"name": "range_mi",
						"title": "Range Mi",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "second_fuel",
						"title": "Second Fuel",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "A second fuel the vehicle takes, such as `E85` or `Electricity`.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
						"short": "`epa` or `nrcan`.",
					},
					map[string]any{
						"name": "source_id",
						"title": "Source Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "EPA's id for the rating.",
					},
					map[string]any{
						"name": "transmission",
						"title": "Transmission",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_fuel",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/fuel",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "fuel",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"fuel",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.ratings`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_investigation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "action",
						"title": "Action",
						"type": "`$STRING`",
						"req": true,
						"short": "NHTSA's action number.",
					},
					map[string]any{
						"name": "campaigns",
						"title": "Campaigns",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The recall campaigns it led to, as NHTSA numbers them.",
					},
					map[string]any{
						"name": "closed",
						"title": "Closed",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day it was closed.",
					},
					map[string]any{
						"name": "component",
						"title": "Component",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The components it names, as NHTSA words them, separated by `; `.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "The letters the number starts with.",
					},
					map[string]any{
						"name": "kind_name",
						"title": "Kind Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The kind in words.",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturers it names, separated by `; `.",
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "In an answer about one model year: how the investigation's vehicle text reached that model.",
					},
					map[string]any{
						"name": "models",
						"title": "Models",
						"type": "`$ARRAY`",
						"req": true,
						"short": "In an answer about one model year: the model names the investigation lists that reached it.",
					},
					map[string]any{
						"name": "open",
						"title": "Open",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether it was opened in 2010 or later and has no day closed.",
					},
					map[string]any{
						"name": "opened",
						"title": "Opened",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day it was opened.",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's one-line subject.",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's summary.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_investigation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/investigations",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "investigations",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"investigations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2019_ram_1500",
										},
									},
									"query": []any{
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
											"example": "open",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_labor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The newest day an estimate was changed.",
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "basis",
						"title": "Basis",
						"type": "`$STRING`",
						"req": true,
						"short": "`expert`: written by a person who does the work.",
					},
					map[string]any{
						"name": "class",
						"title": "Class",
						"type": "`$ANY`",
						"short": "The class, for a class-scope figure.",
					},
					map[string]any{
						"name": "class_name",
						"title": "Class Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The engine the vehicle id named, as an id form.",
					},
					map[string]any{
						"name": "estimates",
						"title": "Estimates",
						"type": "`$ARRAY`",
						"req": true,
						"short": "One for each job that has a figure covering the vehicle, in the order of the job list.",
					},
					map[string]any{
						"name": "hours",
						"title": "Hours",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Hours, as numbers of hours.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "job",
						"title": "Job",
						"type": "`$STRING`",
						"req": true,
						"short": "The job's id.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
						"short": "\"An estimate, not a quote.",
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "sample",
						"title": "Sample",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "scope",
						"title": "Scope",
						"type": "`$STRING`",
						"req": true,
						"short": "What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`.",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
						"req": true,
						"short": "The day the figure was last changed.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The job's page on this site.",
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The model year an answer is about.",
					},
					map[string]any{
						"name": "years",
						"title": "Years",
						"type": "`$ANY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_labor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/labor",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "labor",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"labor",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/labor/{job}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "vehicle_id",
									},
									map[string]any{
										"lit": "labor",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{vehicle_id}",
									"labor",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "vehicle_id",
										"job": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "job",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "brake-pads-front",
										},
										map[string]any{
											"name": "vehicle_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"vehicle_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.vehicle",
						},
					},
				},
			},
			"vehicle_recall": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "built_from",
						"title": "Built From",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "In an answer about one model year: the first and last build date the campaign gives.",
					},
					map[string]any{
						"name": "built_to",
						"title": "Built To",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "campaign",
						"title": "Campaign",
						"type": "`$STRING`",
						"req": true,
						"short": "The publisher's campaign number.",
					},
					map[string]any{
						"name": "component",
						"title": "Component",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The component, as the source words it.",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
						"short": "`us` or `ca`.",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The day the campaign was reported.",
					},
					map[string]any{
						"name": "do_not_drive",
						"title": "Do Not Drive",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's advisory not to drive the vehicle until it is repaired.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "In an answer about one model year: how the campaign's vehicle text reached that model.",
					},
					map[string]any{
						"name": "mfr_campaign",
						"title": "Mfr Campaign",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The manufacturer's own campaign number, which a dealer looks a recall up by.",
					},
					map[string]any{
						"name": "models",
						"title": "Models",
						"type": "`$ARRAY`",
						"req": true,
						"short": "In an answer about one model year: the model names the campaign lists that reached it.",
					},
					map[string]any{
						"name": "notification",
						"title": "Notification",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Transport Canada's notification type, such as `Safety Mfr`.",
					},
					map[string]any{
						"name": "park_outside",
						"title": "Park Outside",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"short": "NHTSA's advisory to park outside, away from buildings.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
						"short": "Who published it: `nhtsa` or `tc` (Transport Canada).",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "What is wrong, in the source's words.",
					},
					map[string]any{
						"name": "units",
						"title": "Units",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Units potentially affected.",
						"format": "int32",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The campaign's page on this site.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_recall",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/recalls",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "recalls",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"recalls",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "us",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_safety": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "body_style",
						"title": "Body Style",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "curb_weight_kg",
						"title": "Curb Weight Kg",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "The weight of the vehicle NHTSA tested.",
						"format": "int32",
					},
					map[string]any{
						"name": "curb_weight_lb",
						"title": "Curb Weight Lb",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
						"short": "The vehicle NHTSA rated, in NHTSA's words, on one line.",
					},
					map[string]any{
						"name": "drive",
						"title": "Drive",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "features",
						"title": "Features",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The safety features NHTSA lists with a rating.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": "`$STRING`",
						"req": true,
						"short": "How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`.",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"req": true,
						"short": "The model, body style, vehicle type and drive as NHTSA words them.",
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover.",
					},
					map[string]any{
						"name": "release",
						"title": "Release",
						"type": "`$INTEGER`",
						"req": true,
						"short": "1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again.",
						"format": "int32",
					},
					map[string]any{
						"name": "rollover_risk_percent",
						"title": "Rollover Risk Percent",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"short": "The chance of a rollover in a single-vehicle crash, in percent.",
						"format": "double",
					},
					map[string]any{
						"name": "rollover_tip",
						"title": "Rollover Tip",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"short": "Whether the vehicle tipped up in NHTSA's dynamic test.",
					},
					map[string]any{
						"name": "stars",
						"title": "Stars",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The stars of one rating, each from 1 to 5.",
					},
					map[string]any{
						"name": "vehicle_type",
						"title": "Vehicle Type",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_safety",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/safety",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "safety",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"safety",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_spec": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "battery_type",
						"title": "Battery Type",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "battery_voltage",
						"title": "Battery Voltage",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "confidence",
						"title": "Confidence",
						"type": "`$STRING`",
						"req": true,
						"short": "`model`, `engine` or `submodel`, as on a fuel rating.",
					},
					map[string]any{
						"name": "cylinder_deactivation",
						"title": "Cylinder Deactivation",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "cylinder_deactivation_name",
						"title": "Cylinder Deactivation Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The maker's name for it, such as `Active Fuel Management`.",
					},
					map[string]any{
						"name": "described_as",
						"title": "Described As",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "drive",
						"title": "Drive",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "electrification",
						"title": "Electrification",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`.",
					},
					map[string]any{
						"name": "emission_standards",
						"title": "Emission Standards",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "ev_motor",
						"title": "Ev Motor",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "exhaust_valves",
						"title": "Exhaust Valves",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "fuel_grade",
						"title": "Fuel Grade",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fuel_usage",
						"title": "Fuel Usage",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Whether the grade is recommended or required, in EPA's words.",
					},
					map[string]any{
						"name": "gears",
						"title": "Gears",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "intake_valves",
						"title": "Intake Valves",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Per cylinder.",
						"format": "int32",
					},
					map[string]any{
						"name": "luggage_volume_ft3",
						"title": "Luggage Volume Ft3",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "luggage_volume_l",
						"title": "Luggage Volume L",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "motor_kw",
						"title": "Motor Kw",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`.",
					},
					map[string]any{
						"name": "passenger_volume_ft3",
						"title": "Passenger Volume Ft3",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "passenger_volume_l",
						"title": "Passenger Volume L",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "size_class",
						"title": "Size Class",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "source_id",
						"title": "Source Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "start_stop",
						"title": "Start Stop",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "supercharger",
						"title": "Supercharger",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "transmission",
						"title": "Transmission",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "transmission_type",
						"title": "Transmission Type",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "turbo",
						"title": "Turbo",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "variable_valve_lift",
						"title": "Variable Valve Lift",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "variable_valve_timing",
						"title": "Variable Valve Timing",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_spec",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/specs",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "specs",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"specs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle_tire": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bolt_pattern",
						"title": "Bolt Pattern",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "checked",
						"title": "Checked",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lug_torque_lbft",
						"title": "Lug Torque Lbft",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int64",
					},
					map[string]any{
						"name": "lug_torque_nm",
						"title": "Lug Torque Nm",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int64",
					},
					map[string]any{
						"name": "lug_torque_written_in",
						"title": "Lug Torque Written In",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "`nm` or `lbft`.",
					},
					map[string]any{
						"name": "market",
						"title": "Market",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "pressure_kpa",
						"title": "Pressure Kpa",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "pressure_psi",
						"title": "Pressure Psi",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "pressure_written_in",
						"title": "Pressure Written In",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The unit the document printed: `kpa`, `bar` or `psi`.",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$STRING`",
						"req": true,
						"short": "The size as printed.",
					},
					map[string]any{
						"name": "size_rear",
						"title": "Size Rear",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The rear size, only when it differs from the front.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "trims",
						"title": "Trims",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The trims the document ties the size to, as it names them.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle_tire",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vehicles/{id}/tires",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "tires",
									},
								},
								"parts": []any{
									"v1",
									"vehicles",
									"{id}",
									"tires",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2018_ford_f-150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vin": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base_price_usd",
						"title": "Base Price Usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"short": "Manufacturer base price in US dollars, when NHTSA has one.",
						"format": "double",
					},
					map[string]any{
						"name": "body",
						"title": "Body",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "catalog",
						"title": "Catalog",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "check_digit",
						"title": "Check Digit",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "doors",
						"title": "Doors",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "drivetrain",
						"title": "Drivetrain",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "gvwr",
						"title": "Gvwr",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Gross vehicle weight rating class, as NHTSA words it.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "make",
						"title": "Make",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "plant",
						"title": "Plant",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Where the vehicle was built.",
					},
					map[string]any{
						"name": "recalls",
						"title": "Recalls",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "safety",
						"title": "Safety",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "seat_rows",
						"title": "Seat Rows",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "seats",
						"title": "Seats",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "series",
						"title": "Series",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "transmission",
						"title": "Transmission",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "transmission_speeds",
						"title": "Transmission Speeds",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
					map[string]any{
						"name": "trim",
						"title": "Trim",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "valid",
						"title": "Valid",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the check digit, position 9, is right.",
					},
					map[string]any{
						"name": "vin",
						"title": "Vin",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Things to know about a decode that still succeeded.",
					},
					map[string]any{
						"name": "wheel_size_front",
						"title": "Wheel Size Front",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Front wheel diameter in inches.",
						"format": "int32",
					},
					map[string]any{
						"name": "wheel_size_rear",
						"title": "Wheel Size Rear",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Rear wheel diameter in inches.",
						"format": "int32",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"format": "int32",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2023,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vin_bulletin": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "bulletins",
						"title": "Bulletins",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "counts",
						"title": "Counts",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What the bulletins of one model year are, in numbers.",
					},
					map[string]any{
						"name": "decode",
						"title": "Decode",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What a VIN decoded to, as far as recalls need it.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "next_cursor",
						"title": "Next Cursor",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin_bulletin",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/bulletins",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "bulletins",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
									"bulletins",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "code",
											"orig": "code",
											"type": "`$STRING`",
											"kind": "query",
											"example": "P0420",
										},
										map[string]any{
											"name": "component",
											"orig": "component",
											"type": "`$STRING`",
											"kind": "query",
											"example": "brakes",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"example": "noise",
										},
										map[string]any{
											"name": "topic",
											"orig": "topic",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "warranty_extension",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2023,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vin_fluid": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "brake",
						"title": "Brake",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "checked_as_of",
						"title": "Checked As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "coolant",
						"title": "Coolant",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "decode",
						"title": "Decode",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What a VIN decoded to, as far as recalls need it.",
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "engine_oil",
						"title": "Engine Oil",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "engine_oil_checked",
						"title": "Engine Oil Checked",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Narrowed as `engine_oil` is.",
					},
					map[string]any{
						"name": "engine_settled",
						"title": "Engine Settled",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether `engine_oil` is narrowed to `engine`.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "refrigerant",
						"title": "Refrigerant",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "transmission",
						"title": "Transmission",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin_fluid",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/fluids",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "fluids",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
									"fluids",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vin_fuel": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The day each country's fuel ratings were current.",
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "decode",
						"title": "Decode",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What a VIN decoded to, as far as recalls need it.",
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "engine_settled",
						"title": "Engine Settled",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether `ratings` is narrowed to `engine`.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ratings",
						"title": "Ratings",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin_fuel",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/fuel",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "fuel",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
									"fuel",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vin_labor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "class",
						"title": "Class",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "decode",
						"title": "Decode",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What a VIN decoded to, as far as recalls need it.",
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "estimates",
						"title": "Estimates",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin_labor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/labor",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "labor",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
									"labor",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/labor/{job}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "vin_id",
									},
									map[string]any{
										"lit": "labor",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{vin_id}",
									"labor",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"job": "id",
										"vin": "vin_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "job",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "brake-pads-front",
										},
										map[string]any{
											"name": "vin_id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"vin_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.vin",
						},
					},
				},
			},
			"vin_recall": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The day each country's recall data was current.",
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "decode",
						"title": "Decode",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What a VIN decoded to, as far as recalls need it.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lookup",
						"title": "Lookup",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Where to check one vehicle for open recalls.",
					},
					map[string]any{
						"name": "may_apply",
						"title": "May Apply",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Always `true`.",
					},
					map[string]any{
						"name": "recalls",
						"title": "Recalls",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin_recall",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/recalls",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "recalls",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
									"recalls",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "us",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2023,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vin_spec": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "decode",
						"title": "Decode",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What a VIN decoded to, as far as recalls need it.",
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "engine_settled",
						"title": "Engine Settled",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether `specs` is narrowed to `engine`.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "specs",
						"title": "Specs",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin_spec",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/specs",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "specs",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
									"specs",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vin_tire": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_of",
						"title": "As Of",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "decode",
						"title": "Decode",
						"type": "`$OBJECT`",
						"req": true,
						"short": "What a VIN decoded to, as far as recalls need it.",
					},
					map[string]any{
						"name": "fitments",
						"title": "Fitments",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Every fitment of the model year.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "warnings",
						"title": "Warnings",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vin_tire",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/vin/{vin}/tires",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "vin",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "tires",
									},
								},
								"parts": []any{
									"v1",
									"vin",
									"{id}",
									"tires",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vin": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vin",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "KM8K2CAB4PU001140",
										},
									},
									"query": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
