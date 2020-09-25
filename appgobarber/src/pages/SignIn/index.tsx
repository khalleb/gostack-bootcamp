import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>
      <Input />
      <Input />
      <Button
        onPress={() => {
          console.log('Pressionado');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;
