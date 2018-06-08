import PropTypes from "prop-types";
import React from "react";
import Loadable from "react-loadable";

import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
import Comments from "./Comments";
import NextPrev from "./NextPrev";
import RepoDetails from "./RepoDetails";
import RepoDescription from "./RepoDescription";
import Editor from "../Article/Editor";
import Loading from "../Loading";

const LoadableShare = Loadable({
  loader: () => import("./Share"),
  loading() {
    return <Loading />;
  }
});

const Post = props => {
  const {
    post,
    post: {
      html,
      fileAbsolutePath,
      fields: { prefix, slug },
      frontmatter: { title, category }
    },
    authornote,
    facebook,
    next: nextPost,
    prev: prevPost,
    theme,
    repo
  } = props;

  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
        <Meta prefix={prefix} category={category} theme={theme} />
      </header>
      {repo && <RepoDescription theme={theme} repo={repo} />}
      <Bodytext html={html} theme={theme} />
      {repo && <RepoDetails theme={theme} repo={repo} />}
      <footer>
        <LoadableShare post={post} theme={theme} />
        <Author note={authornote} theme={theme} />
        <Editor path={fileAbsolutePath} theme={theme} />
        <NextPrev next={nextPost} prev={prevPost} theme={theme} />
        <Comments slug={slug} facebook={facebook} theme={theme} />
      </footer>
    </React.Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired,
  repo: PropTypes.object
};

export default Post;
