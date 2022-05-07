import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Books from '../../pages/Books';
import Genres from '../../pages/Genres';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="page-fade" timeout={300}>
        <Routes location={location}>
          <Route index path="/" element={<Genres />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
