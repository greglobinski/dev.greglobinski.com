import PropTypes from "prop-types";
import React from "react";

import Bodytext from "../Article/Bodytext";
import Headline from "../Article/Headline";
import Editor from "../Article/Editor";

const Page = props => {
  const {
    page: {
      html,
      fileAbsolutePath,
      frontmatter: { title }
    },
    theme
  } = props;

  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
      </header>
      <Bodytext html={html} theme={theme} />
      <footer>
        <Editor path={fileAbsolutePath} theme={theme} />
      </footer>
    </React.Fragment>
  );
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Page;
