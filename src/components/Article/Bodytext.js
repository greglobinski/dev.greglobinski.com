import React from "react";
import PropTypes from "prop-types";

const Bodytext = props => {
  const { html, theme, children, className } = props;

  return (
    <React.Fragment>
      {html ? (
        <div className="bodytext" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className={`bodytext ${className}`}>{children}</div>
      )}

      <style jsx>{`
        .bodytext {
          animation-name: bodytextEntry;
          animation-duration: ${theme.time.duration.long};

          :global(.tweets) {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          :global(.twitter-tweet) {
            flex-basis: 100%;
            flex-shrink: 1;
          }

          :global(h2),
          :global(h3) {
            margin: 1.5em 0 1em;
          }

          :global(h2) {
            line-height: ${theme.font.lineHeight.s};
            font-size: ${theme.font.size.l};
          }

          :global(h3) {
            font-size: ${theme.font.size.m};
            line-height: ${theme.font.lineHeight.m};
          }

          :global(p) {
            font-size: ${theme.font.size.s};
            line-height: ${theme.font.lineHeight.xxl};
            margin: 0 0 1.5em;
          }

          :global(ul) {
            list-style: circle;
            margin: 0 0 1.5em;
            padding: 0 0 0 1.5em;
          }

          :global(li) {
            margin: 0.7em 0;
            line-height: 1.5;
            font-size: ${theme.font.size.s};
          }

          :global(a):not(.ant-btn) {
            font-weight: ${theme.font.weight.bold};
            color: ${theme.color.brand.primary};
            text-decoration: underline;
          }

          :global(a.gatsby-resp-image-link) {
            border: 0;
            display: block;
            margin: 2.5em 0;
            border-radius: ${theme.size.radius.default};
            overflow: hidden;
            border: 1px solid ${theme.line.color};
          }

          :global(.gatsby-highlight) {
            margin: 2.5em -${theme.space.m};

            :global(pre) {
              border-radius: 0;
            }
          }

          :global(p > code),
          :global(li > code) {
            background: ${theme.color.neutral.gray.c};
            text-shadow: none;
            color: inherit;
            padding: 0.1em 0.3em 0.2em;
            border-radius: ${theme.size.radius.tiny};
          }

          :global(blockquote) {
            padding-left: ${theme.space.m};
            border-left: 5px solid #bbb;
          }
        }

        @keyframes bodytextEntry {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @from-width tablet {
          .bodytext {
            :global(.twitter-tweet) {
              flex-basis: 48%;
            }

            :global(.gatsby-highlight) {
              margin: 2.5em 0;

              :global(pre) {
                border-radius: ${theme.size.radius.small};
              }
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Bodytext.propTypes = {
  children: PropTypes.node,
  html: PropTypes.string,
  theme: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Bodytext;
