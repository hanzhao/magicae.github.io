import React from 'react';
import { DefaultTemplate } from '../templates';
import { ShowView } from '../components';

export default {
  render: () => {
    return React.render(
      <DefaultTemplate>
        <ShowView />
      </DefaultTemplate>
      , document.querySelector('app')
    );
  }
};
