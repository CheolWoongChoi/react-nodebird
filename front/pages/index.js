import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.1/antd.min.css"></link>
      </Head>
      <AppLayout>
      </AppLayout>
    </>
  );
};

export default Home;

