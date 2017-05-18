import React from 'react';
import InputField from './InputField';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
  	<InputField placeHolderText='snapShotTextPlaceHolder' filterText='snapShotTextFilter' />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
