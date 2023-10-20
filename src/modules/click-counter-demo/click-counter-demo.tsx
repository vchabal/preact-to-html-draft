import { h, Component, Fragment, ComponentChild } from 'preact';

import { l10n } from '@src/l10n';
import { ClickCounter } from '@shared/cmp';
import { Facebook, Instagram } from '@shared/icon';

import './click-counter-demo.scss';

export class ClickCounterDemo extends Component {
  render (): ComponentChild {
    return (
      <Fragment>
        <main class="demo">
          <h1 class="demo__title">{ this.props.children }</h1>
          <section>
            <span>{ l10n`${1} click counter` }</span>
            <ClickCounter />
          </section>
          <section>
            <span>{ l10n`${2} click counter` }</span>
            <ClickCounter />
          </section>
          <section>
            <Facebook />
            <Instagram />
          </section>
        </main>
      </Fragment>
    );
  }
}
