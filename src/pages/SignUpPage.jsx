import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Formik, Field, ErrorMessage, Form } from "formik";

import * as Yup from "yup";

import logo from "../assets/logo.png";

import SmallLoading from "../components/SmallLoading";

import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../server-connection";
import LoggedUserContext from "../context/loggedUserContext";

function SignUpPage() {
  document.title = "Meme Station | Create account";

  const [password, showPassword] = useState(false);
  const [rePassword, showRePassword] = useState(false);

  const [loggingErr, setLoggingErr] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First Name can't be less than 3 characters.")
      .required("Please enter your first name."),
    lastName: Yup.string()
      .min(3, "Last Name can't be less than 3 characters.")
      .required("Please enter your last name."),
    username: Yup.string()
      .min(3, "Usernames can't be less than 3 characters.")
      .required("Please enter your username."),
    password: Yup.string().required("You need to create a password."),
    confirmPassword: Yup.string().required(
      "Type your password again to confirm it."
    ),
  });

  const init = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const { setLoggedUser } = useContext(LoggedUserContext)
  const navigate = useNavigate();

  const submitHandler = (data) => {
    axios({
      method: "POST",
      url: BASE_URL + "/auth/register",
      data: data,
    }).then(res => {
      console.log(res.data);
      axios({
        method: "POST",
        url: BASE_URL + "/auth/login",
        data: {
          username: data.username,
          password: data.password,
        },
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
          setLoggingErr(err.response?.data?.message)
        });
    }).catch(err => {
      setLoggingErr(err.response?.data?.message)
    })
  };

  return (
    <motion.main
      layout
      layoutId="form-page"
      className="form-page"
    >
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
            <Form autoComplete="off">
              <motion.h1
                className="form-header"
                layoutId="form-page__form-header"
              >
                Create account.
              </motion.h1>
              <motion.div
                init={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="input-group"
              >
                <div className="input-container">
                  <Field name="firstName" type="text" required />
                  <label htmlFor="">First name</label>
                  <ErrorMessage
                    component={"p"}
                    className={"error-msg"}
                    name={"firstName"}
                  />
                </div>
                <div className="input-container">
                  <Field name="lastName" type="text" required />
                  <label htmlFor="">Last name</label>
                  <ErrorMessage
                    component={"p"}
                    className={"error-msg"}
                    name={"lastName"}
                  />
                </div>
              </motion.div>
              <motion.div
                className="input-container"
                layoutId="form-page__username-container"
              >
                <Field type={"text"} name="username" required />
                <label htmlFor="">Username</label>
                <ErrorMessage
                  component={"p"}
                  className={"error-msg"}
                  name={"username"}
                />
              </motion.div>
              <motion.div
                className="input-container"
                layoutId="form-page__password-container"
              >
                <Field
                  type={password ? "text" : "password"}
                  name="password"
                  required
                />
                <label htmlFor="">Password</label>
                <div
                  className="eye-icon"
                  onClick={() => showPassword((s) => !s)}
                >
                  {password ? <FiEyeOff /> : <FiEye />}
                </div>
                <ErrorMessage
                  component={"p"}
                  className={"error-msg"}
                  name={"password"}
                />
              </motion.div>
              <motion.div className="input-container"
                init={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Field
                  type={rePassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                />
                <label htmlFor="">Confirm password</label>
                <div
                  className="eye-icon"
                  onClick={() => showRePassword((s) => !s)}
                >
                  {rePassword ? <FiEyeOff /> : <FiEye />}
                </div>
                <ErrorMessage
                  component={"p"}
                  className={"error-msg"}
                  name={"confirmPassword"}
                />
              </motion.div>
              <motion.button
                layoutId="form-page__form-submit"
                type="submit"
                className={`form-btn primary ${formik.isSubmitting && !loggingErr ? "submitting" : ""
                  }`}
              >
                <SmallLoading /> Create Account
              </motion.button>
              {loggingErr ? <p className="logging-err">{loggingErr}</p> : <></>}
              <motion.p className="tip" layoutId="form-page__form-tip">
                Already have an account ? <Link to="/login">Login.</Link>
              </motion.p>
            </Form>
          </motion.div>
        )}
      </Formik>
    </motion.main>
  );
}

export default SignUpPage;
