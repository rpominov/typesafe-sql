// only types from pg_catalog namespace here

let fixName = name =>
  switch name {
  | "bool" => "bool_"
  | "char" => "char_"
  | _ => name
  }

let isDefiend = name =>
  [
    "bool",
    "bytea",
    "char",
    "int8",
    "int2",
    "int4",
    "regproc",
    "text",
    "oid",
    "tid",
    "xid",
    "cid",
    "json",
    "xml",
    "pg_node_tree",
    "path",
    "polygon",
    "cidr",
    "float4",
    "float8",
    "circle",
    "macaddr8",
    "money",
    "macaddr",
    "inet",
    "aclitem",
    "bpchar",
    "varchar",
    "date",
    "time",
    "timestamp",
    "timestamptz",
    "interval",
    "timetz",
    "bit",
    "varbit",
    "numeric",
    "refcursor",
    "regprocedure",
    "regoper",
    "regoperator",
    "regclass",
    "regtype",
    "uuid",
    "txid_snapshot",
    "pg_lsn",
    "pg_ndistinct",
    "pg_dependencies",
    "tsvector",
    "tsquery",
    "gtsvector",
    "regconfig",
    "regdictionary",
    "jsonb",
    "jsonpath",
    "regnamespace",
    "regrole",
    "regcollation",
    "pg_brin_bloom_summary",
    "pg_brin_minmax_multi_summary",
    "pg_mcv_list",
    "pg_snapshot",
    "xid8",
    "_xml",
    "_json",
    "_xid8",
    "_cidr",
    "_circle",
    "_macaddr8",
    "_money",
    "_bool",
    "_bytea",
    "_char",
    "_int2",
    "_int4",
    "_regproc",
    "_text",
    "_tid",
    "_xid",
    "_cid",
    "_bpchar",
    "_varchar",
    "_int8",
    "_path",
    "_float4",
    "_float8",
    "_polygon",
    "_oid",
    "_aclitem",
    "_macaddr",
    "_inet",
    "_timestamp",
    "_date",
    "_time",
    "_timestamptz",
    "_interval",
    "_numeric",
    "_timetz",
    "_bit",
    "_varbit",
    "_refcursor",
    "_regprocedure",
    "_regoper",
    "_regoperator",
    "_regclass",
    "_regtype",
    "_txid_snapshot",
    "_uuid",
    "_pg_lsn",
    "_tsvector",
    "_gtsvector",
    "_tsquery",
    "_regconfig",
    "_regdictionary",
    "_jsonb",
    "_jsonpath",
    "_regnamespace",
    "_regrole",
    "_regcollation",
    "_pg_snapshot",
  ]->Js.Array2.includes(name)

type bool_ = bool // 16
type bytea = string // 17
type char_ = string // 18
type int8 = string // 20
type int2 = int // 21
type int4 = int // 23
type regproc = string // 24
type text = string // 25
type oid = int // 26
type tid = string // 27
type xid = string // 28
type cid = string // 29
type json = string // 114
type xml = string // 142
type pg_node_tree = string // 194
type path = string // 602
type polygon = string // 604
type cidr = string // 650
type float4 = float // 700
type float8 = float // 701
type circle = string // 718
type macaddr8 = string // 774
type money = string // 790
type macaddr = string // 829
type inet = string // 869
type aclitem = string // 1033
type bpchar = string // 1042
type varchar = string // 1043
type date = string // 1082
type time = string // 1083
type timestamp = string // 1114
type timestamptz = string // 1184
type interval = string // 1186
type timetz = string // 1266
type bit = string // 1560
type varbit = string // 1562
type numeric = string // 1700
type refcursor = string // 1790
type regprocedure = string // 2202
type regoper = string // 2203
type regoperator = string // 2204
type regclass = string // 2205
type regtype = string // 2206
type uuid = string // 2950
type txid_snapshot = string // 2970
type pg_lsn = string // 3220
type pg_ndistinct = string // 3361
type pg_dependencies = string // 3402
type tsvector = string // 3614
type tsquery = string // 3615
type gtsvector = string // 3642
type regconfig = string // 3734
type regdictionary = string // 3769
type jsonb = string // 3802
type jsonpath = string // 4072
type regnamespace = string // 4089
type regrole = string // 4096
type regcollation = string // 4191
type pg_brin_bloom_summary = string // 4600
type pg_brin_minmax_multi_summary = string // 4601
type pg_mcv_list = string // 5017
type pg_snapshot = string // 5038
type xid8 = string // 5069

type _xml = array<xml> // 143
type _json = array<json> // 199
type _xid8 = array<xid8> // 271
type _cidr = array<cidr> // 651
type _circle = array<circle> // 719
type _macaddr8 = array<macaddr8> // 775
type _money = array<money> // 791
type _bool = array<bool_> // 1000
type _bytea = array<bytea> // 1001
type _char = array<char_> // 1002
type _int2 = array<int2> // 1005
type _int4 = array<int4> // 1007
type _regproc = array<regproc> // 1008
type _text = array<text> // 1009
type _tid = array<tid> // 1010
type _xid = array<xid> // 1011
type _cid = array<cid> // 1012
type _bpchar = array<bpchar> // 1014
type _varchar = array<varchar> // 1015
type _int8 = array<int8> // 1016
type _path = array<path> // 1019
type _float4 = array<float4> // 1021
type _float8 = array<float8> // 1022
type _polygon = array<polygon> // 1027
type _oid = array<oid> // 1028
type _aclitem = array<aclitem> // 1034
type _macaddr = array<macaddr> // 1040
type _inet = array<inet> // 1041
type _timestamp = array<timestamp> // 1115
type _date = array<date> // 1182
type _time = array<time> // 1183
type _timestamptz = array<timestamptz> // 1185
type _interval = array<interval> // 1187
type _numeric = array<numeric> // 1231
type _timetz = array<timetz> // 1270
type _bit = array<bit> // 1561
type _varbit = array<varbit> // 1563
type _refcursor = array<refcursor> // 2201
type _regprocedure = array<regprocedure> // 2207
type _regoper = array<regoper> // 2208
type _regoperator = array<regoperator> // 2209
type _regclass = array<regclass> // 2210
type _regtype = array<regtype> // 2211
type _txid_snapshot = array<txid_snapshot> // 2949
type _uuid = array<uuid> // 2951
type _pg_lsn = array<pg_lsn> // 3221
type _tsvector = array<tsvector> // 3643
type _gtsvector = array<gtsvector> // 3644
type _tsquery = array<tsquery> // 3645
type _regconfig = array<regconfig> // 3735
type _regdictionary = array<regdictionary> // 3770
type _jsonb = array<jsonb> // 3807
type _jsonpath = array<jsonpath> // 4073
type _regnamespace = array<regnamespace> // 4090
type _regrole = array<regrole> // 4097
type _regcollation = array<regcollation> // 4192
type _pg_snapshot = array<pg_snapshot> // 5039

type unknown
