import FaChain from "react-icons/lib/fa/chain";
import PropTypes from "prop-types";
import React from "react";

import Bodytext from "../Article/Bodytext";

const RepoDescription = props => {
  const {
    repo: { description },
    theme
  } = props;

  return (
    <Bodytext theme={theme}>
      <p>{description}</p>
    </Bodytext>
  );
};

RepoDescription.propTypes = {
  repo: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default RepoDescription;
