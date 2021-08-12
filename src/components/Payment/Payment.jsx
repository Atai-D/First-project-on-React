import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import { Button } from "@material-ui/core";
import { useBlog } from "../../contexts/BlogContext";
import "./Payment.css";

// const schema = yup.object().shape({
//     email: yup.string().email().required(),
//     password: yup.string().min(8).max(32).required(),
// });

const Payment = () => {
    // const [state, setState] = useState({
    //     cvc: "",
    //     expiry: "",
    //     focus: "",
    //     name: "",
    //     number: "",
    // });

    const { payForBlogs, payingBlogs, history } = useBlog();

    // const handleInputFocus = (e) => {
    //     setState({ ...state, focus: e.target.name });
    // };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;

    //     setState({ ...state, [name]: value });
    // };

    const handleSubmitPayment = (e) => {
        e.preventDefault();
        payForBlogs(payingBlogs);
        history.push("/mypromotions");
    };

    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [month, SetMonth] = useState("");
    let [expiry, SetExpiry] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");
    const handleDate = (e) => {
        SetMonth(e.target.value);
        SetExpiry(e.target.value);
    };
    const handleExpiry = (e) => {
        SetExpiry(month.concat(e.target.value));
    };

    return (
        <>
            {/* <div className="rccs__card backcolor"> */}

            <div
                clasName="rccs__card rccs__card--unknown"
                style={{ marginTop: "50px" }}
            >
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focus}
                />
            </div>

            <br />
            <form
                style={{ marginBottom: "50px" }}
                onSubmit={handleSubmitPayment}
            >
                <div className="row">
                    <div className="col-sm-11">
                        <label for="name">Card Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            value={number}
                            name="number"
                            maxlength="16"
                            pattern="[0-9]+"
                            onChange={(e) => {
                                SetNumber(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-11">
                        <label for="name">Card Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            name="name"
                            onChange={(e) => {
                                SetName(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div
                        className="col=sm-8"
                        style={{
                            ...{ "padding-right": "12em" },
                            ...{ "padding-left": "1em" },
                        }}
                    >
                        <label for="month">Expiration Date</label>
                    </div>
                    <div className="col=sm-4">
                        <label for="cvv">CVV</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={handleDate}
                        >
                            <option value=" ">Month</option>
                            <option value="01">Jan</option>
                            <option value="02">Feb</option>
                            <option value="03">Mar</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">Aug</option>
                            <option value="09">Sep</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Dec</option>
                        </select>
                    </div>
                    &nbsp;
                    <div className="col-sm-4">
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={handleExpiry}
                        >
                            <option value=" ">Year</option>
                            <option value="21">2021</option>
                            <option value="22">2022</option>
                            <option value="23">2023</option>
                            <option value="24">2024</option>
                            <option value="25">2025</option>
                            <option value="26">2026</option>
                            <option value="27">2027</option>
                            <option value="28">2028</option>
                            <option value="29">2029</option>
                            <option value="30">2030</option>
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <input
                            type="tel"
                            name="cvc"
                            maxlength="3"
                            className=" form-control card"
                            value={cvc}
                            pattern="\d*"
                            onChange={(e) => {
                                SetCvc(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                </div>
                <br />
                <input
                    type="submit"
                    className="btn btn-secondary form-control"
                    value="Pay"
                />
            </form>
        </>
    );
};

export default Payment;

// <div id="PaymentForm">
//             <Cards
//                 cvc={state.cvc}
//                 expiry={state.expiry}
//                 focused={state.focus}
//                 name={state.name}
//                 number={state.number}
//             />
//             <form onSubmit={handleSubmitPayment}>
//                 <input
//                     type="number"
//                     name="number"
//                     placeholder="Card Number"
//                     onChange={handleInputChange}
//                     onFocus={handleInputFocus}
//                     value={state.number}
//                 />
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Your name"
//                     onChange={handleInputChange}
//                     onFocus={handleInputFocus}
//                     value={state.name}
//                 />
//                 <input
//                     type="number"
//                     name="cvc"
//                     placeholder="Card CVC"
//                     onChange={handleInputChange}
//                     onFocus={handleInputFocus}
//                     value={state.cvc}
//                 />
//                 <input
//                     type="number"
//                     name="expiry"
//                     placeholder="Card Expiry"
//                     onChange={handleInputChange}
//                     onFocus={handleInputFocus}
//                     value={state.expiry}
//                 />
//                 <Button type="submit">Оплатить</Button>
//             </form>
//         </div>

//////////////////////////

//////////////////////////

// const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
// } = useForm({
//     resolver: yupResolver(schema),
// });
// const onSubmitHandler = (data) => {
//     console.log({ data });
//     reset();
// };
// return (
//     <form onSubmit={handleSubmit(onSubmitHandler)}>
//         <h2>Lets sign you in.</h2>
//         <br />

//         <input
//             {...register("email")}
//             placeholder="email"
//             type="email"
//             required
//         />
//         <p>{errors.email?.message}</p>
//         <br />

//         <input
//             {...register("password")}
//             placeholder="password"
//             type="password"
//             required
//         />
//         <p>{errors.password?.message}</p>
//         <br />

//         <button type="submit">Sign in</button>
//     </form>
// );
