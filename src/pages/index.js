import Loadable from "react-loadable";
import PropTypes from "prop-types";
import React from "react";

import { ThemeContext, ScreenWidthContext } from "../layouts";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import Loading from "../components/Loading";

const LoadableBlog = Loadable({
  loader: () => import("../components/Blog"),
  loading() {
    return <Loading />;
  }
});

class IndexPage extends React.Component {
  separator = React.createRef();

  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      data: {
        posts: { edges: posts },
        repos: { edges: repos },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        bgDesktopWebp: {
          resize: { src: desktopWebp }
        },
        bgTabletWebp: {
          resize: { src: tabletWebp }
        },
        bgMobileWebp: {
          resize: { src: mobileWebp }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile,
      desktopWebp,
      tabletWebp,
      mobileWebp
    };

    return (
      <React.Fragment>
        <ScreenWidthContext.Consumer>
          {screenWidth => (
            <ThemeContext.Consumer>
              {theme => (
                <Hero
                  scrollToContent={this.scrollToContent}
                  backgrounds={backgrounds}
                  theme={theme}
                  screenWidth={screenWidth}
                />
              )}
            </ThemeContext.Consumer>
          )}
        </ScreenWidthContext.Consumer>

        <hr ref={this.separator} />

        <ThemeContext.Consumer>
          {theme => <LoadableBlog posts={posts} repos={repos} theme={theme} />}
        </ThemeContext.Consumer>

        <Seo facebook={facebook} />

        {/* --- STYLES --- */}
        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const guery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
            prefix
            identifier
          }
          frontmatter {
            title
            category
            cover {
              children {
                ... on ImageSharp {
                  sizes(maxWidth: 800, maxHeight: 300, cropFocus: NORTH) {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    repos: allGithubRepositories {
      edges {
        node {
          name
          description
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgDesktopWebp: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER, toFormat: WEBP) {
        src
      }
    }
    bgTablet: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTabletWebp: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER, toFormat: WEBP) {
        src
      }
    }
    bgMobile: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobileWebp: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER, toFormat: WEBP) {
        src
      }
    }
    algolia: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts|pages/[0-9]+.*--/" } }
    ) {
      edges {
        node {
          objectID: fileAbsolutePath
          fields {
            slug
          }
          internal {
            content
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
