import { h, Component, Fragment, ComponentChild } from 'preact';

export interface HeadMetaProps {
  title?: string;
  keywords?: string;
  description?: string;
  viewport?: string;
  favico?: string;
}

const defaultProps: HeadMetaProps = {
  title: '',
  keywords: 'keywords,comma,separated,values',
  description: 'A one sentence description about the website in general, in between 70 to 155 characters',
  viewport: 'width=device-width, initial-scale=1',
  favico: 'assets/img/favicon.ico'
}

export class HeadMeta extends Component<HeadMetaProps | null, {}> {
  render(props: HeadMetaProps): ComponentChild {
    props = {
      ...defaultProps,
      ...props
    };

    return (
      <Fragment>
        <meta charSet="utf-8"/>
        <meta name="keywords" content={ props.keywords }/>
        <meta name="description" content={ props.description }/>
        <meta name="viewport" content={ props.viewport }/>
        <title>{ props.title } | Naylah</title>
        <link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon"/>
      </Fragment>
    );
  }
}
