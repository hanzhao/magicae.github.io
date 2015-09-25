import React from 'react';
import { Container } from 'amazeui-react';
import { Header, Footer, BreadNavigation } from '../components';

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
        <Footer />
      </Container>
    );
  }
}

export default DefaultTemplate;
