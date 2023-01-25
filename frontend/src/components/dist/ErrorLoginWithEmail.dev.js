"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactBootstrap = require("react-bootstrap");

require("react-phone-number-input/style.css");

var _loginUser = require("../services/loginUser");

require("../LoginEmailOtp.css");

require("bootstrap/dist/css/bootstrap.min.css");

var _Dashboard = _interopRequireDefault(require("./Dashboard"));

var _Navbar = _interopRequireDefault(require("./Navbar"));

var _reactToastify = require("react-toastify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import PhoneInput from "react-phone-number-input";
// import { useUserAuth } from "../context/UserAuthContext";
// const LoginEmailOtp = () => {
//   //refrence
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const setVal = (e) => {
//       setEmail(e.target.value)
//   }
//   const sendLink = async (e) => {
//     e.preventDefault();
//     console.log(email)
; //     if (email === "") {
//         toast.error("email is required!", {
//             position: "top-center"
//         });
//     } else if (!email.includes("@")) {
//         toast.warning("includes @ in your email!", {
//             position: "top-center"
//         });
//     } else {
//         Loginbymail({email})
//             .then(result => {
//                 if (result.data.status == 200) {
//                     setEmail("");
//                     setMessage(true)
//                 } else {
//                     toast.error("Invalid User", {
//                         position: "top-center"
//                     })
//                 }
//             }).catch(err => {
//                 console.log(err);
//             })
//     }
// }
//   return (
//     <>
//       <Navbar />
//             <div className='container-fluid pt-5 ' style={{ marginTop: "50px" }}>
//                 <div className="row mx-4" style={{ marginTop: "40px", marginBottom: "30px" }}>
//                     <div className=' clr ' style={{ textAlign: "center" }}>
//                         <div className='login text-dark' style={{ backgroundColor: "whiteSmoke" }}>
//                             <h2 className='mb-3 text-primary'> Login with Email OTP </h2>
//                             <p style={{ fontSize: "12px" }}>Please enter your email address to login</p>
//                             {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
//                             <Form style={{ marginLeft: "20px" }} autocomplete="off">
//                                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                                     <Form.Label>Email address</Form.Label>
//                                     <Form.Control className='border border-secondary' type="email" placeholder="Enter email" name="email" value={email} onChange={setVal} />
//                                 </Form.Group>
//                                 <Button className="bg-primary mt-2 w-50" type="button" href="/" onClick={sendLink} >
//                                     Send
//                                 </Button>
//                             </Form>
//                             <ToastContainer />
//                             <div className="row pt-3" style={{ marginBottom: "20px" }}>
//                                 <div className="col-sm-5" style={{ textAlign: "right" }}>
//                                     <span ><a href="/login">Click here to login  👈</a></span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     </>
//   );
// };

var _default = LoginEmailOtp;
exports["default"] = _default;