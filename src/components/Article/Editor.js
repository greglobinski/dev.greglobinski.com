import FaInfoCircle from "react-icons/lib/fa/info-circle";
import PropTypes from "prop-types";
import React from "react";

import { localToGithubUrl } from "../../utils/helpers";

const Editor = props => {
  const { path, theme } = props;

  return (
    <React.Fragment>
      <div className="editor">
        <FaInfoCircle /> You should know that English is not my native language. So please be
        understanding if you find any mistake or unclear meaning in my wrtiting. If you want, You
        can suggest corrections by{" "}
        <a href={localToGithubUrl(path)} target="_blank">
          editing this file
        </a>{" "}
        on GitHub.
      </div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .editor {
          margin: ${theme.space.l} 0;
          padding: ${theme.space.m};
          font-size: ${theme.font.size.xxs};
          line-height: ${theme.font.lineHeight.xl};
          background: ${theme.color.neutral.gray.a};
          border-radius: ${theme.size.radius.small};
          color: ${theme.color.neutral.gray.h};

          :global(a) {
            color: ${theme.color.brand.primary};
            font-weight: ${theme.font.weight.bold};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Editor.propTypes = {
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Editor;
