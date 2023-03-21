import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Component from '.';
import configureStore from '../../../../redux/setup/storeSetup';

const component = Component;
const { store } = configureStore();

export default {
  title: 'Pages/CreatePlugins',
  component,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof component>;

const Template: ComponentStory<typeof component> = (args) => (
  <Provider store={store}>
    <Component {...args} />
  </Provider>
);

export const Primary = Template.bind({});
