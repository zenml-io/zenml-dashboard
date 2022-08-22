import React from 'react';
import { H1 } from '../components';
import { getTranslateByScope } from '../../services';

export const translate = getTranslateByScope('ui.layouts.NotFound');

export const NotFound: React.FC = () => <H1>{translate('title')}</H1>;
