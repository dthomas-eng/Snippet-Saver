import React, { Fragment, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import BodyLoader from "../layout/BodyLoader";
import BodyLoaderContext from "../../context/bodyLoader/bodyLoaderContext";
import BodyAlertContext from "../../context/bodyAlert/bodyAlertContext";
import BodyAlert from "../layout/BodyAlert";
import BodyBanner from "../layout/BodyBanner";
import BodyBannerContext from "../../context/bodyBanner/bodyBannerContext";

const ForgotPassword = () => {
  const bodyLoaderContext = useContext(BodyLoaderContext);
  const { showBodyLoader, hideBodyLoader } = bodyLoaderContext;

  const bodyAlertContext = useContext(BodyAlertContext);
  const { showAlert, hideAlert } = bodyAlertContext;

  const bodyBannerContext = useContext(BodyBannerContext);
  const { showBanner, hideBanner } = bodyBannerContext;

  const [user, setUser] = useState({
    email: "",
  });
  const { email } = user;

  const history = useHistory();

  const returnHome = () => {
    return history.push("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      showAlert("Email is required.");
      setTimeout(() => {
        hideAlert();
      }, 3000);
      return 0;
    }

    const user = {
      email,
    };

    showBodyLoader();

    fetch("/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        hideBodyLoader();
        if (res.success === true) {
          showBanner(`Password reset link has been sent to ${email}`);
          setTimeout(() => {
            hideBanner();
            returnHome();
          }, 3000);
        } else if (res.success === false) {
          showAlert(res.error);
          setTimeout(() => {
            hideAlert();
          }, 3000);
        }
      })
      .catch((err) => {
        hideBodyLoader();
        showAlert("Unable to contact server. Password reset link not sent");
        console.error(err.message);
        setTimeout(() => {
          hideAlert();
        }, 3000);
      });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className='jumbotron mt-3 mb-0 p-4 square-border bg-white'>
        <h1 className='logo-text'>Forgot Password</h1>
        <p className='body-text-14 mt-4'>
          Enter your email and we'll send you a reset link.
        </p>
        <hr className='my-4'></hr>
        <form id='forgot-password-frm' onSubmit={onSubmit}>
          <div className='input-group mb-3'>
            <input
              type='email'
              name='email'
              onChange={onChange}
              className='form-control'
              placeholder='Email'
            ></input>
          </div>
          <button
            type='submit'
            className='btn btn-block dark-color btn-dark square-border body-text-14 mt-3'
          >
            Submit
          </button>
        </form>
      </div>
      <BodyLoader />
      <BodyBanner />
      <BodyAlert />
    </Fragment>
  );
};

export default ForgotPassword;
