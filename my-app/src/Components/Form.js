import React, { useState, useEffect }from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {

    const [user, newUser] = useState([]);
    
    useEffect(() => {
        console.log("status has changed!", status);
        status && newUser(user => [...user, status])
    }, [status]);
return (
    <div>
        <Form>
            <label htmlFor="name">Name: </label>
            <Field id="name" type="text" name="name" placeholder="Name"></Field>
            {touched.name && errors.name && (<p>{errors.name}</p>)}

            <label htmlFor="email">Email: </label>
            <Field id="email" type="text" name="email" placeholder="Email"></Field>
            {touched.email && errors.email && (<p>{errors.email}</p>)}

            <label htmlFor="password">Password: </label>
            <Field id="password" type="password" name="password" placeholder="Password"></Field>
            {touched.password && errors.password && (<p>{errors.password}</p>)}

            <label htmlFor="terms">Do you accept the terms of service?</label>
            <Field type="checkbox" name="terms" checked={values.terms}></Field>
            <button type="submit">Submit</button>
        </Form>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        {user.map(user => (
            <ul key ={user.id}>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Password: {user.password}</li>
            </ul>
        ))}
    </div>
)
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios.post("https://reqres.in/api/users", values)
        .then(response => {
            console.log("success", response)
            setStatus(response.data);
            resetForm();
        })
        .catch(error => console.log(error.response));
    }
})(UserForm);
export default FormikUserForm