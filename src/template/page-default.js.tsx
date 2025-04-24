import { h, render } from 'preact';
import { body } from './page-default-component';

const Body = () => body;
export default function() {
  render(<Body/>, document.body);
}
