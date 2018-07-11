import React from "react";
import PropTypes from "prop-types";
import { ShareButtonRectangle, ShareBlockStandard } from "react-custom-share";
import FaTwitter from "react-icons/lib/fa/twitter";
import FaFacebook from "react-icons/lib/fa/facebook";
import FaGooglePlus from "react-icons/lib/fa/google-plus";
import FaLinkedin from "react-icons/lib/fa/linkedin";

import config from "../../../content/meta/config";

const PostShare = props => {
  const {
    post: {
      fields: { slug },
      frontmatter: { title },
      excerpt
    },
    theme
  } = props;

  const url = config.siteUrl + slug;

  const shareBlockProps = {
    url: url,
    button: ShareButtonRectangle,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebook },
      { network: "GooglePlus", icon: FaGooglePlus },
      { network: "Linkedin", icon: FaLinkedin }
    ],
    text: title,
    longtext: excerpt
  };

  return (
    <React.Fragment>
      <div className="share">
        <span className="label">SHARE</span>
        <div className="links">
          <ShareBlockStandard {...shareBlockProps} />
        </div>
      </div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .share {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .links {
          display: flex;
          flex-direction: row;
          flex-grow: 1;
          width: 100%;

          :global(> div) {
            width: 100%;
          }
        }

        .label {
          background: #ddd;
          color: #fff;
          font-size: 1.2em;
          flex-grow: 0;
          display: flex;
          height: 44px;
          flex-basis: 100px;
          justify-content: center;
          align-items: center;
        }

        @from-width tablet {
          .share {
            margin: ${theme.space.inset.l} 0;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

PostShare.propTypes = {
  post: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default PostShare;
