import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginbymail } from '../services/auth';

export default function LoginByEmail() {
    const ValidationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
    })
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: ValidationSchema,
        onSubmit: (data) => {
            loginbymail(data)
                .then(result => {
                    console.log(result);
                }).catch(err => {
                    console.log(err);
                })
        }
    })
    return (
        <div>
            <h2> Form Validation with formik and yup</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <label> Email</label>
                    <input type="text" className="form-control" name='email' onChange={formik.handleChange} value={formik.values.email} />
                    {/* Errors */}
                    {formik.errors.email && formik.touched.email ?
                        <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
                </div>
                <input type="submit" className='btn btn-success' value="Validation" />
            </form>
        </div>
    )
}