import path from 'path';
import React from 'react';
import { Icon, Breadcrumb } from 'amazeui-react';

function getLocation() {
  return location.hash.substring(1).split('/')
      .filter((s) => s).map(s => s.replace(/%20/g, ' '));
}

class BreadNavigation extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let cur = '#';
    let items = getLocation().map((x, i) => {
      cur = path.join(cur, x);
      if (i == 0)
        return (
          <Breadcrumb.Item key={i}
                           href={cur}>
            <Icon icon="home" />{ ' HOME' }
          </Breadcrumb.Item>
        );
      if (cur == location.hash)
        return (
          <Breadcrumb.Item key={i} active>
            { x }
          </Breadcrumb.Item>
        );
      return (
        <Breadcrumb.Item key={i}
                         href={cur}>
          { x }
        </Breadcrumb.Item>
      );
    });
    return (
      <Breadcrumb slash>
        { items }
      </Breadcrumb>
    );
  }
}

export default BreadNavigation;
