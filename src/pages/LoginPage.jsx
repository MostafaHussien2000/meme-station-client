import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Formik, Field, ErrorMessage, Form } from "formik";

import * as Yup from "yup";

import logo from "../assets/logo.png";
import SmallLoading from "../components/SmallLoading";

import { motion } from 'framer-motion'
import axios from "axios";
import LoggedUserContext from "../context/loggedUserContext";
import { BASE_URL } from "../server-connection";

function LoginPage() {
    document.title = "Meme Station | Login";


    const [password, showPassword] = useState(false);

    const [loggingErr, setLoggingErr] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Usernames can't be less than 3 characters.")
            .required("Please enter your username."),
        password: Yup.string().required("Please enter your password."),
    });

    const init = {
        username: "",
        password: "",
    };

    const { setLoggedUser } = useContext(LoggedUserContext);

    const navigate = useNavigate();

    const submitHandler = (data) => {
        axios({
            method: "POST",
            url: BASE_URL + "/auth/login",
            data: data,
        })
            .then((res) => {
                if (res.data.accessToken) {
                    setLoggedUser({
                        accessToken: res.data.accessToken,
                        data: res.data.data
                    })
                    navigate("/profile/" + res.data.data.username)
                }
            })
            .catch((err) => {
                console.dir(err.response?.data?.message)
                setLoggingErr(err.response?.data?.message)
            });
    };


    return (
        <motion.main layout className="form-page" layoutId="form-page">
            <motion.header layoutId="form-page__page-header">
                <Link to="/" id="back-button">
                    <HiOutlineArrowNarrowLeft /> <span>Back to home</span>
                </Link>
                <img src={logo} alt="meme station logo" />
            </motion.header>
            <Formik
                initialValues={init}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
            >
                {(formik) => (
                    <motion.div layoutId="form-page__form-container">
                        <Form autoComplete="off" >
                            <motion.h1 className="form-header" layoutId="form-page__form-header">Login.</motion.h1>
                            <motion.div className="input-container" layoutId="form-page__username-container">
                                <Field name="username" type="text" required />
                                <label htmlFor="">Username</label>
                                <ErrorMessage
                                    component={"p"}
                                    className={"error-msg"}
                                    name={"username"}
                                />
                            </motion.div>
                            <motion.div className="input-container" layoutId="form-page__password-container">
                                <Field
                                    type={password ? "text" : "password"}
                                    name="password"
                                    required
                                />
                                <label htmlFor="">Password</label>
                                <div className="eye-icon" onClick={() => showPassword((s) => !s)}>
                                    {password ? <FiEyeOff /> : <FiEye />}
                                </div>
                                <ErrorMessage
                                    component={"p"}
                                    className={"error-msg"}
                                    name={"password"}
                                />
                            </motion.div>

                            <motion.button
                                layoutId="form-page__form-submit"
                                type="submit"
                                className={`form-btn primary ${formik.isSubmitting && !loggingErr ? "submitting" : ""
                                    }`}
                            >
                                <SmallLoading /> Login
                            </motion.button>
                            {
                                loggingErr ? <p className="logging-err">{loggingErr}</p> : <></>
                            }
                            <motion.p className="tip" layoutId="form-page__form-tip">
                                You don't have an account ? <Link to="/create-account">Create one.</Link>
                            </motion.p>
                        </Form>
                    </motion.div>
                )}
            </Formik>
        </motion.main>
    );
}

export default LoginPage;
