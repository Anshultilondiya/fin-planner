"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sip_1 = __importDefault(require("./sip"));
const retirement_1 = __importDefault(require("./retirement/retirement"));
const CalculatorJunction = (fastify, options, done) => {
    fastify.register(sip_1.default, { prefix: '/sip' });
    fastify.register(retirement_1.default, { prefix: '/retirement' });
    done();
};
exports.default = CalculatorJunction;
