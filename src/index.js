import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css';

import Play from './components/pages/play';
import Guide from './components/pages/guide';
import Leaderboard from './components/pages/leaderboard';
//import * as query from '../pages/query';

import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';

const TWITTER_HANDLE = 'FrostCorealis';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const BUILDSPACE_LINK = 'https://buildspace.so';

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <React.StrictMode>
      <WalletProvider {...chainOptions}>
      <div className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />

            {/* These are empty so they will error for now, don't worry! */}
            <Route path="/play" element={<Play />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/guide" element={<Guide />} />

          </Routes>
        </BrowserRouter>

        <div className="footer-container">
          <p className="footer-text"> built on{' '}<a
            className="footer-text"
            href={BUILDSPACE_LINK}
            target="_blank"
            rel="noreferrer"
          >{' '}buildspace 🦄</a>{' '}by    
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{' '}Frost Corealis</a></p>
        </div>
      </div>

      </WalletProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});