import { motion } from "framer-motion"

import { useContext } from "react"

import LoggedUserContext from "../context/loggedUserContext"

import { FiUpload } from "react-icons/fi"

import { Formik, Form, Field } from "formik"

import { BASE_URL } from "../server-connection";

function PersonalSettings() {
    const { loggedUser } = useContext(LoggedUserContext)

    return (
        <motion.section
            key={0}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
            }}
            id="personal-settings"
        >
            <h1>Personal information</h1>
            <h4 className="sub-head">Profile picture</h4>
            <Formik

            >
                {
                    formik => (
                        <Form className="profile-pic-form">
                            <div className="img-preview">
                                <img src={
                                    BASE_URL +
                                    "/user/uploads/" +
                                    loggedUser?.data?.profilePicture?.split("\\")[1]
                                } alt="profile pic" />
                            </div>
                            <div className="actions">
                                <button className="button primary">
                                    <FiUpload />
                                    Upload new one
                                </button>
                                <button className="button danger">
                                    Remove it !
                                </button>
                            </div>
                        </Form>
                    )
                }
            </Formik>

            <h4 className="sub-head">Cover picture</h4>
            <Formik>
                {
                    formik => (
                        <Form className="cover-pic-form">
                            <div className="img-preview">
                                {loggedUser?.data?.coverPicture ? <img src={
                                    BASE_URL +
                                    "/user/uploads/" +
                                    loggedUser?.data?.coverPicture?.split("\\")[1]
                                } alt="profile pic" /> : <></>}
                            </div>
                            <div className="actions">
                                <button className="button primary">
                                    <FiUpload />
                                    Upload new one
                                </button>
                                <button className="button danger">
                                    Remove it !
                                </button>
                            </div>
                        </Form>
                    )
                }
            </Formik>

            <h4 className="sub-head">Profile information</h4>
            <Formik>
                {
                    formik => (
                        <Form className="information-form">
                            <div className="input-group">
                                <div className="input-container">
                                    <Field name="firstName" type="text" placeholder={loggedUser?.data?.firstName} />
                                </div>
                                <div className="input-container">
                                    <Field name="firstName" type="text" placeholder={loggedUser?.data?.lastName} />
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>

        </motion.section>
    );
}

export default PersonalSettings;
