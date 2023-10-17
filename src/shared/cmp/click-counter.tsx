import { h, Component, Fragment, ComponentChild } from 'preact';
import { l10n } from '@src/l10n';

import './click-counter.scss';

export interface ClickCounterState {
  clickCount: number;
}

export class ClickCounter extends Component<{}, ClickCounterState>{

  readonly state: ClickCounterState = { clickCount: 0 };

  get clickCount(): number {
    return this.state.clickCount;
  }

  click(): void {
    this.setState({ clickCount: this.clickCount + 1 });
  }

  render(): ComponentChild {
    return (
      <Fragment>
        <a class="click-counter" onClick={() => this.click()}>{ l10n`${this.clickCount} clicks` }</a>
      </Fragment>
    )
  }

}
