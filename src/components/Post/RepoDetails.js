/* eslint no-unused-vars: 0 */

import Button from "antd/lib/button";
import FaChain from "react-icons/lib/fa/chain";
import FaGithub from "react-icons/lib/fa/github";
import FaStar from "react-icons/lib/fa/star";
import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";

import buttonStyle from "antd/lib/button/style/index.css";

import Bodytext from "../Article/Bodytext";
import CodeBlock from "./CodeBlock";

const RepoDetails = props => {
  const {
    repo: {
      homepageUrl,
      name,
      url,
      stargazers: { totalCount: stars },
      object: { text: repoReadme }
    },
    theme
  } = props;

  const separatorIndex = repoReadme.indexOf("## Description");

  if (~separatorIndex) {
    var shortenedRepoReadme = repoReadme.substring(separatorIndex + 14);
  }

  return (
    <React.Fragment>
      <Bodytext theme={theme}>
        <div className="repo">
          <h2 className="header">
            <FaGithub />Github
          </h2>
          <h2>{name}</h2>
          <div className="links">
            <Button href={url} type="primary" size="large">
              Code
            </Button>
            <Button href={homepageUrl} size="large">
              Demo
            </Button>
            <Button href={url} size="large">
              <FaStar />
              <span>{stars}</span>
            </Button>
          </div>
          <h2>README.md</h2>
          <ReactMarkdown
            source={shortenedRepoReadme ? shortenedRepoReadme : repoReadme}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </Bodytext>

      <style jsx>{`
        .repo {
          .header {
            display: flex;
            align-items: center;
            font-size: ${theme.font.size.xxl};

            :global(svg) {
              margin-right: ${theme.space.s};
              color: ${theme.color.brand.primary};
            }
          }
        }

        .links {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          height: 50px;

          :global(a) {
            flex-basis: 31%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2em;
            height: 100%;

            :global(svg) {
              margin: ${theme.space.inline.xs};
            }
          }

          :global(.ant-btn-primary) {
            background-color: ${theme.color.brand.primary};
            border-color: ${theme.color.brand.primary};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

RepoDetails.propTypes = {
  repo: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default RepoDetails;
