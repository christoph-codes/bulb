"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Login_module_sass_1 = __importDefault(require("../../styles/Login.module.sass"));
const react_2 = require("react");
const Input_1 = __importDefault(require("../Input/Input"));
const router_1 = require("next/router");
const md_1 = require("react-icons/md");
const LoginForm = ({ setMessage }) => {
    const router = (0, router_1.useRouter)();
    const [isSubmitting, setIsSubmitting] = (0, react_2.useState)(false);
    const [isCreatingAccount, setIsCreatingAccount] = (0, react_2.useState)(false);
    const [formError, setFormError] = (0, react_2.useState)(false);
    const [values, setValues] = (0, react_2.useState)({
        username: '',
        password: '',
        confirmpw: '',
        email: '',
    });
    const redirectToDashboard = (userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
        router.push('/dashboard');
    };
    const submitLoginCreds = () => {
        setIsSubmitting(true);
        const request = {
            username: values.username,
            password: values.password,
        };
        fetch('/api/login', { method: 'POST', body: JSON.stringify(request) })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            if (response.status === 200) {
                const data = yield response.json();
                redirectToDashboard(data);
            }
            else if (response.status === 401) {
                setFormError(true);
            }
        }))
            .catch((err) => {
            console.error(err);
            setFormError(true);
        })
            .finally(() => {
            setIsSubmitting(false);
        });
    };
    const submitAccountCreation = () => {
        setIsSubmitting(true);
        const request = {
            fname: values.username,
            lname: values.username,
            email: values.email,
            password: values.password,
        };
        fetch('/api/createAccount', {
            method: 'POST',
            body: JSON.stringify(request),
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            if (response.status === 200) {
                setMessage('Your account has been created! Please check your email for verification.');
                setIsCreatingAccount(false);
            }
        }))
            .catch((err) => {
            console.error(err);
            setFormError(true);
        })
            .finally(() => {
            setIsSubmitting(false);
        });
    };
    const validateForm = () => {
        const isCredsFilled = values.username && values.password;
        const isAccountCredsFilled = values.confirmpw === values.password && values.email;
        if (!isCredsFilled || (isCreatingAccount && !isAccountCredsFilled)) {
            setFormError(true);
            return false;
        }
        setFormError(false);
        return true;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            isCreatingAccount ? submitAccountCreation() : submitLoginCreds();
        }
    };
    const handleChange = (fieldName) => (value) => {
        setValues(Object.assign(Object.assign({}, values), { [fieldName]: value }));
    };
    return (react_1.default.createElement("div", { className: Login_module_sass_1.default.LoginForm },
        react_1.default.createElement("form", { className: Login_module_sass_1.default.form + (isCreatingAccount ? ` ${Login_module_sass_1.default.revealed}` : '') },
            react_1.default.createElement("section", { className: Login_module_sass_1.default.loginSection },
                react_1.default.createElement("div", { className: Login_module_sass_1.default.bulb }, "\uD83D\uDCA1"),
                react_1.default.createElement("br", null),
                react_1.default.createElement(Input_1.default, { type: 'text', name: 'uname', required: true, setValue: handleChange('username'), isFormValid: !formError, label: 'Username' }),
                react_1.default.createElement("br", null),
                react_1.default.createElement(Input_1.default, { type: 'password', name: 'psw', required: true, setValue: handleChange('password'), isFormValid: !formError, label: 'Password' })),
            react_1.default.createElement("div", { className: Login_module_sass_1.default.loginActions },
                react_1.default.createElement("button", { className: Login_module_sass_1.default.loginButton, onClick: handleSubmit, type: 'submit', disabled: isSubmitting }, isSubmitting ? react_1.default.createElement(md_1.MdLightbulb, null) : 'Log In'),
                react_1.default.createElement("p", { onClick: () => {
                        setIsCreatingAccount(true);
                    } },
                    react_1.default.createElement("span", { className: Login_module_sass_1.default.formToggle }, "Create an account"))),
            react_1.default.createElement("section", { className: Login_module_sass_1.default.accountSection +
                    ' ' +
                    (!isCreatingAccount ? Login_module_sass_1.default.hidden : '') },
                react_1.default.createElement(Input_1.default, { type: 'password', name: 'confirm-psw', required: true, setValue: handleChange('confirmpw'), isFormValid: !formError, label: 'Confirm PW' }),
                react_1.default.createElement("br", null),
                react_1.default.createElement(Input_1.default, { type: 'text', name: 'email', required: true, setValue: handleChange('email'), isFormValid: !formError, label: 'Email' }),
                react_1.default.createElement("div", { className: Login_module_sass_1.default.accountActions },
                    react_1.default.createElement("button", { className: Login_module_sass_1.default.accountButton, onClick: handleSubmit, type: 'submit', disabled: isSubmitting }, isSubmitting ? react_1.default.createElement(md_1.MdLightbulb, null) : 'Create Account'),
                    react_1.default.createElement("p", { onClick: () => {
                            setIsCreatingAccount(false);
                        } },
                        react_1.default.createElement("span", { className: Login_module_sass_1.default.formToggle }, "Back to Login")),
                    react_1.default.createElement("div", { className: Login_module_sass_1.default.bulb }, "\uD83D\uDCA1"))))));
};
exports.default = LoginForm;
