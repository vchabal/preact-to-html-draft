import './image.scss';
import { h } from 'preact';

export const Image = (props) =>
  <picture class={ `pic ${props.class || ''}` }>
    <source srcset={ `${props.src}.webp` } type="image/webp"></source>
    <img src={ props.src }
         alt={ props.alt }
         draggable={ props.draggable || false }
         class="pic__img"
         decoding={ props.decoding || 'async' }
         loading={ props.loading || 'lazy' }
         width={ props.width || '100%' }
         height={ props.height || '100%' }/>
  </picture>
