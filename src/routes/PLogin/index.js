/* eslint-disable import/extensions */
import React, { Component } from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import BasicFooter from '@/layouts/LBasic/Footer';

import './style.scss';

const PREFIX = `${__PROJECT__}PSignIn`;

const IndexWrapper = styled.div`
  text-align:center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #7C4DFF;
`;

const TitleLogo = styled.img`
  text-align: center;
`;

@inject('User')
@observer
class SignIn extends Component {
  static propTypes = {
    User: PropTypes.string,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  onSubmit = (values) => {
    const { username, password } = values;
    const { User } = this.props;
    User.signIn({ username, password }, () => {
      const {
        history: { replace },
        location: { search },
      } = this.props;
      const { from = 'home' } = qs.parse(search.substr(1));
      replace(`${from}`);
    });
  };

  render() {
    return (
      <div className={PREFIX}>
        <Helmet>
          <title>SoLiD Portal</title>
          <meta name="description" content="SoLiD" />
        </Helmet>
        <main className={`${PREFIX}-content`}>
          <IndexWrapper>
            <TitleLogo src="https://design.inrupt.com/atomic-core/img/solid.svg" width="250px" />
            <Title>Hello, SoLiD Portal</Title>
          </IndexWrapper>
        </main>
        <BasicFooter className={`${PREFIX}-footer`} />
      </div>
    );
  }
}

export default SignIn;
