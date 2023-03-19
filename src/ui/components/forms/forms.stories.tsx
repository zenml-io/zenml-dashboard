import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormTextField } from './';

const component = FormTextField;

export default {
  title: 'Forms/TextField',
  component,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof component>;

const Template: ComponentStory<typeof component> = (args) => (
  <FormTextField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Example text input',
  value: 'Example',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Another field',
  required: '*',
  placeholder: 'Placeholder value',
};
