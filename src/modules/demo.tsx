import { h, Component, Fragment, ComponentChild } from 'preact';

import { l10n } from '@src/l10n';
import { ClickCounter } from '@shared/cmp';
import { Facebook, Instagram } from '@shared/icon';

import './demo.scss';

export class Demo extends Component {

  render (): ComponentChild {
    return (
      <Fragment>
        <main class="demo">
          <h1 class="demo__title">{ l10n`Click below` }</h1>
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
