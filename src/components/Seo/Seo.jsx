import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import config from "../../../content/meta/config";

const Seo = props => {
  const {
    data: {
      frontmatter: {
        title,
        description,
        cover: { childImageSharp: { resize: { src: cover } = {} } = {} } = {}
      } = {},
      fields: { slug = "" } = {}
    } = {},
    facebook
  } = props;

  const seoTitle = title ? `${title} - ${config.shortSiteTitle}` : config.siteTitle;
  const seoDescription = description ? description : config.siteDescription;
  const seoImage = cover ? `${config.siteUrl}${cover}` : `${config.siteUrl}/${config.siteImage}`;
  const seoImageWidth = cover ? 800 : 1200;
  const seoImageHeight = cover ? 360 : 630;
  const seoUrl = config.siteUrl + slug;

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: "og: http://ogp.me/ns#"
      }}
    >
      {/* General tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoUrl} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content={seoImageWidth} />
      <meta property="og:image:height" content={seoImageHeight} />
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content={facebook.appId} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={config.authorTwitterAccount ? config.authorTwitterAccount : ""}
      />
    </Helmet>
  );
};

Seo.propTypes = {
  data: PropTypes.object,
  facebook: PropTypes.object.isRequired
};

export default Seo;
