import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import { Button } from "@material-ui/core";
import { useBlog } from "../../contexts/BlogContext";

// const schema = yup.object().shape({
//     email: yup.string().email().required(),
//     password: yup.string().min(8).max(32).required(),
// });

const Payment = () => {
    const [state, setState] = useState({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
    });

    const { payForBlogs, payingBlogs, history } = useBlog();

    const handleInputFocus = (e) => {
        setState({ ...state, focus: e.target.name });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    const handleSubmitPayment = (e) => {
        e.preventDefault();
        payForBlogs(payingBlogs);
        history.push("/mypromotions");
    };

    return (
        <div id="PaymentForm">
            <Cards
                cvc={state.cvc}
                expiry={state.expiry}
                focused={state.focus}
                name={state.name}
                number={state.number}
            />
            <form onSubmit={handleSubmitPayment}>
                <input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={state.number}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={state.name}
                />
                <input
                    type="number"
                    name="cvc"
                    placeholder="Card CVC"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={state.cvc}
                />
                <input
                    type="number"
                    name="expiry"
                    placeholder="Card Expiry"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={state.expiry}
                />
                <Button type="submit">Оплатить</Button>
            </form>
        </div>
    );
};

export default Payment;

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
