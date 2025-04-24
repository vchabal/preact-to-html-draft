import './layout-squares-css.scss';
import { } from 'preact/hooks';
import { h } from 'preact';

export const LayoutSquaresCss = (props) => {
  return <div class={ `layout-squares-css ${props.class || ''}` }>
    { props.children.map(item =>
      <div class="layout-squares-css__item">
        <div class={ `layout-squares-css__wrapper ${props.wrapper || ''}` }>{ item }</div>
      </div>) }
  </div>
}
