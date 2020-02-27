import React from "react";
import { Form, Field, withFormik } from "formik";

const UserForm = ({ values }) => {

return (
    <div>
        <Form>
            <label htmlFor="password">password: </label>
            <Field id="password" type="text" name="name" placeholder="Name"></Field>

            <label htmlFor="email">Email: </label>
            <Field id="email" type="text" name="email" placeholder="Email"></Field>

            <label htmlFor="password">Password: </label>
            <Field id="password" type="password" name="password" placeholder="password"></Field>
        </Form>
    </div>
)
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password }){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
        }
    }
})(UserForm);
export default FormikUserForm