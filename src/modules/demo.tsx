import { h, Component, Fragment, ComponentChild } from 'preact';

import { l10n } from '@src/l10n';
import { ClickCounter } from '@shared/cmp';
import { Facebook, Instagram } from '@shared/icon';

export class Demo extends Component {

  render (): ComponentChild {
    return (
      <Fragment>
        <main>
          <h1>{ l10n`Click here` }!</h1>
          <section>
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
