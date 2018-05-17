const React = require("react");
const PropTypes = require("prop-types");
const Prism = require(`prismjs`);

class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    Prism.highlightElement(this.codeEl);
  }

  render() {
    return (
      <div className="gatsby-highlight">
        <pre className={`language-${this.props.language}`}>
          <code ref={this.setRef} className={`language-${this.props.language}`}>
            {this.props.value}
          </code>
        </pre>
      </div>
    );
  }
}

CodeBlock.defaultProps = {
  language: ""
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

module.exports = CodeBlock;
