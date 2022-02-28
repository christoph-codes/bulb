"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_module_sass_1 = __importDefault(require("../../styles/Input.module.sass"));
const Input = ({ type, name, required, setValue, isFormValid, label, }) => {
    return (react_1.default.createElement("div", { className: Input_module_sass_1.default.input },
        label && (react_1.default.createElement("label", { className: Input_module_sass_1.default.label, htmlFor: name },
            react_1.default.createElement("b", null,
                label,
                ":"))),
        "\u00A0",
        react_1.default.createElement("input", { className: Input_module_sass_1.default.creds + ' ' + (!isFormValid && Input_module_sass_1.default.invalidInput), type: type, name: name, required: required, onChange: (e) => setValue(e.target.value), maxLength: 40 })));
};
exports.default = Input;
