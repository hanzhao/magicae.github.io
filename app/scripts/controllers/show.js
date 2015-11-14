import React from 'react';
import ReactDOM from 'react-dom';
import { DefaultTemplate } from '../templates';
import { ShowView } from '../components';

export default {
  render: () => {
    return ReactDOM.render(
      <DefaultTemplate>
        <ShowView />
      </DefaultTemplate>
      , document.querySelector('app')
    );
  }
};
