import React from 'react';
import {Icon} from 'amazeui-react';
import qwest from 'qwest';
import marked from 'marked';
import highlight from 'highlight.js';

const STATUS_LOADING = 0;
const STATUS_SUCCESS = 1;
const STATUS_FAIL = 2;

marked.setOptions({
  highlight: (code) => {
    return highlight.highlightAuto(code).value;
  }
});

class Markdown extends React.Component {
  state = {
    status: STATUS_LOADING,
    html: ''
  };
  constructor(props, context) {
    super(props, context);
  }
  async fetchData() {
    try {
      let md;
      if (window.sessionStorage && sessionStorage[this.props.src])
        md = sessionStorage[this.props.src];
      else {
        let xhr = await qwest.get(this.props.src);
        md = xhr.response;
        if (window.sessionStorage) {
          sessionStorage[this.props.src] = md;
        }
      }
      this.setState({
        status: STATUS_SUCCESS,
        html: marked(md).replace(/<code class="/g, '<code class="hljs ')
      });
    } catch (e) {
      this.setState({
        status: STATUS_FAIL
      });
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  renderLoading() {
    return (
      <Icon icon="spinner" spin />
    );
  }
  renderFail() {
    return (
      <Icon icon="times" />
    );
  }
  renderMarkdown() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.state.html}} />
    );
  }
  render() {
    if (this.state.status == STATUS_LOADING)
      return this.renderLoading();
    if (this.state.status == STATUS_FAIL)
      return this.renderFail();
    if (this.state.status == STATUS_SUCCESS)
      return this.renderMarkdown();
  }
}

export default Markdown;
