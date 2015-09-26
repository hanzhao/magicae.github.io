import React from 'react';
import { Icon } from 'amazeui-react';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="hosted-on">
          Hosted on <a href="https://github.com/magicae/magicae.github.io">
            <Icon icon="github" />
          </a>.
        </div>
      </div>
    );
  }
}

export default Footer;
