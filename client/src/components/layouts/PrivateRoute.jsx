import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component, isLoading, isAuthenticated }) {
  if (isLoading)
    return (
      <h1>Loading Private Route...</h1>
    );
  if (isAuthenticated) return <Component />;
  return <Navigate to="/auth/signin" />;
}

PrivateRoute.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
