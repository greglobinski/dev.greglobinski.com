import Loadable from "react-loadable";
import PropTypes from "prop-types";
import React from "react";
//import { chunkString } from "../utils/helpers";

import { ThemeContext, ScreenWidthContext } from "../layouts";
import Hero from "../components/Hero";
import Seo from "../components/Seo";

const LoadableBlog = Loadable({
  loader: () => import("../components/Blog"),
  loading() {
    return <div>Loading...</div>;
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

    // const algolia = this.props.data.algolia;
    // const objects = algolia.edges.map(({ node }) => {
    //   const {
    //     objectID,
    //     fields: { slug },
    //     frontmatter: { title },
    //     internal: { content }
    //   } = node;
    //   return { objectID, title, slug, content };
    // });
    // const chunks = algolia.edges.reduce((chunksTotal, { node }) => {
    //   const {
    //     objectID,
    //     fields: { slug },
    //     frontmatter: { title },
    //     internal: { content }
    //   } = node;

    //   const contentChunks = chunkString(content, 5000);
    //   const record = { objectID, title, slug, content };
    //   const recordChunks = contentChunks.reduce((recordChunksTotal, contentChunksItem, idx) => {
    //     return [
    //       ...recordChunksTotal,
    //       { ...record, ...{ objectID: `${objectID}/${idx}`, content: contentChunksItem } }
    //     ];
    //   }, []);

    //   return [...chunksTotal, ...recordChunks];
    // }, []);

    //console.log(algolia);
    //console.log("objects", objects);
    //console.log("chunks", chunks);

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
