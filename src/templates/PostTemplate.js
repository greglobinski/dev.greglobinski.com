import PropTypes from "prop-types";
import React from "react";

require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import { ThemeContext } from "../layouts";

const PostTemplate = props => {
  const {
    data: {
      post,
      authornote: { html: authorNote },
      site: {
        siteMetadata: { facebook }
      },
      repo
    },
    pathContext: { next, prev }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <Post
              post={post}
              next={next}
              prev={prev}
              authornote={authorNote}
              facebook={facebook}
              theme={theme}
              repo={repo}
            />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo data={post} facebook={facebook} />
    </React.Fragment>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired
};

export default PostTemplate;

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!, $identifier: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fileAbsolutePath
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        category
        cover {
          childImageSharp {
            resize(width: 800, height: 360) {
              src
            }
          }
        }
      }
    }
    repo: githubRepositories(name: { eq: $identifier }) {
      name
      url
      description
      homepageUrl
      stargazers {
        totalCount
      }
      object {
        text
      }
    }
    authornote: markdownRemark(id: { regex: "/author/" }) {
      html
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
