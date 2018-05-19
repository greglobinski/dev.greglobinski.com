const React = require("react");
const PropTypes = require("prop-types");

const CodeBlock = props => {
  const { value, language } = props;

  return (
    <div className="gatsby-highlight">
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>{value}</code>
      </pre>
    </div>
  );
};

CodeBlock.defaultProps = {
  language: ""
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

module.exports = CodeBlock;
