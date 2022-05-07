import TextBox from './TextBox';
import { ReactComponent as Search } from 'assets/images/Search.svg';
import { ReactComponent as Cancel } from 'assets/images/Cancel.svg';
export default {
  component: TextBox,
  args: {},
};

export const WithIconStart = {
  arg: {
    iconStart: <Search />,
  },
};

export const WithIconEnd = {
  arg: {
    iconEnd: <Cancel />,
  },
};
