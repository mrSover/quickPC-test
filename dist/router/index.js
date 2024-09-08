"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = __importDefault(require("../controller/auth-controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role-middleware"));
const router = (0, express_1.Router)();
router.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 3, max: 32 }), auth_controller_1.default.registration);
router.post('/login', auth_controller_1.default.login);
router.post('/logout', auth_controller_1.default.logout);
router.get('/activate/:link', auth_controller_1.default.activate);
router.get('/refresh', auth_controller_1.default.refresh);
router.get('/users', auth_middleware_1.default, (0, role_middleware_1.default)(["ADMIN"]), auth_controller_1.default.getUsers);
exports.default = router;
