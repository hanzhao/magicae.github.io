import React from 'react';
import { Container } from 'amazeui-react';
import { Header, BreadNavigation } from '../components';

class DefaultTemplate extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <Container>
        <Header />
        <BreadNavigation />
        { this.props.children }
      </Container>
    );
  }
}

export default DefaultTemplate;
