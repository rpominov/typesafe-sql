// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Parser$ExtendedSQL = require("../Parser.bs.js");

test("Simplest query", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT 1")).toMatchSnapshot();
        
      }));

test("Inline comments", (function () {
        expect(Parser$ExtendedSQL.parse("-- test\nSELECT -- test2\n--\n 1-- test3")).toMatchSnapshot();
        
      }));

test("Block comments", (function () {
        expect(Parser$ExtendedSQL.parse("/* test \n abc*/\nSELECT /* test2 /* test3 */ */ 1/**/")).toMatchSnapshot();
        
      }));

test("Block comments error", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT 1/* test")).toMatchSnapshot();
        
      }));

test("Block comments error nested", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT 1/* test /* test2 ")).toMatchSnapshot();
        
      }));

test("Name attribute", (function () {
        expect(Parser$ExtendedSQL.parse("/*@name: test*/SELECT 1")).toMatchSnapshot();
        
      }));

test("Name attribute (2nd ignored)", (function () {
        expect(Parser$ExtendedSQL.parse("/*@name: testA4_\n@name: test1*/SELECT 1")).toMatchSnapshot();
        
      }));

test("Name attribute (invalid)", (function () {
        expect(Parser$ExtendedSQL.parse("/*@name: %abc*/SELECT 1")).toMatchSnapshot();
        
      }));

test("Name attribute (invalid, starts with a digit)", (function () {
        expect(Parser$ExtendedSQL.parse("/*@name: 4abc*/SELECT 1")).toMatchSnapshot();
        
      }));

test("Name attribute (empty)", (function () {
        expect(Parser$ExtendedSQL.parse("/*@name: */SELECT 1")).toMatchSnapshot();
        
      }));

test("Name attribute (text before)", (function () {
        expect(Parser$ExtendedSQL.parse("/*abc @name: abc*/SELECT 1")).toMatchSnapshot();
        
      }));

test("Name attribute (many comments)", (function () {
        expect(Parser$ExtendedSQL.parse("-- abc\n/* @name: abc*/SELECT 1")).toMatchSnapshot();
        
      }));

test("Name attribute (after code)", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT 1/* @name: abc*/")).toMatchSnapshot();
        
      }));

test("Parameters", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT :foo = :bar")).toMatchSnapshot();
        
      }));

test("Parameters (no name, error)", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT ':'")).toMatchSnapshot();
        
      }));

test("Parameters (no name, escaped)", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT '\\:'")).toMatchSnapshot();
        
      }));

test("Raw", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT :num:raw<1|2>")).toMatchSnapshot();
        
      }));

test("Raw (escaped)", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT '\\:num\\:raw<1|2>'")).toMatchSnapshot();
        
      }));

test("Raw (empty option)", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT :num:raw<1,|> 2")).toMatchSnapshot();
        
      }));

test("Raw (<<<)", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT :num:raw<<<1<|>|||2>>>")).toMatchSnapshot();
        
      }));

test("Raw (<<<, not closed)", (function () {
        expect(Parser$ExtendedSQL.parse("SELECT :num:raw<<<1|||2>>")).toMatchSnapshot();
        
      }));

test("Batch", (function () {
        expect(Parser$ExtendedSQL.parse("INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :bar)>")).toMatchSnapshot();
        
      }));

test("Batch (nested batch)", (function () {
        expect(Parser$ExtendedSQL.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:batch<:bar>)>>")).toMatchSnapshot();
        
      }));

test("Batch (nested raw)", (function () {
        expect(Parser$ExtendedSQL.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:raw<foo|bar>)>>")).toMatchSnapshot();
        
      }));

test("Batch (not closed)", (function () {
        expect(Parser$ExtendedSQL.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo, :bar)>")).toMatchSnapshot();
        
      }));

test("Batch (nested comment)", (function () {
        expect(Parser$ExtendedSQL.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo /* <comment> */)>>")).toMatchSnapshot();
        
      }));

test("Parse file", (function () {
        expect(Parser$ExtendedSQL.parseFile("SELECT 1;SELECT 2;")).toMatchSnapshot();
        
      }));

test("Parse file (custom separator)", (function () {
        expect(Parser$ExtendedSQL.parseFile("-- @separator:### \nSELECT 1###SELECT 2")).toMatchSnapshot();
        
      }));

/*  Not a pure module */
