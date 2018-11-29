import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
configure ({ adapter: new Adapter () });

describe ('<NavigationItems />', () => {
  it ('should render two NavigationItem elements if not isAuthenticated', () => {
    const wrapper = shallow (<NavigationItems isAuthenticated />);
    expect (wrapper.find (NavigationItem));
  });
});
