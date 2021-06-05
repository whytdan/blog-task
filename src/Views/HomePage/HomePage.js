import React from 'react';
import Navbar from '../../components/Navbar';
import PostsList from './components/PostsList';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PostsList />
    </>
  );
}
