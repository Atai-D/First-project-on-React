import React from "react";
import { useForm, Controller } from "react-hook-form";
// import "./Payment.css";
// import Select from "react-select";

// The following component is an example of your existing Input Component
// const Input = ({ label, register, required }) => (
//     <>
//         <label>{label}</label>
//         <input {...register(label, { required })} />
//     </>
// );

// // you can use React.forwardRef to pass the ref too
// const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
//     <>
//         <label>{label}</label>
//         <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
//             <option value="20">20</option>
//             <option value="30">30</option>
//         </select>
//     </>
// ));

const Input = ({ label, register, required }) => (
    <>
        <label>{label}</label>
        <input {...register(label, { required })} />
    </>
);

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
    <>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    </>
));

const Payment = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="First Name" register={register} required />
            <Select label="Age" {...register("Age")} />
            <input type="submit" />
        </form>
    );
};
export default Payment;
