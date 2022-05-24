import React, { Component } from 'react';
import './App.css';
import Login from './pages/Login';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
  );
}
