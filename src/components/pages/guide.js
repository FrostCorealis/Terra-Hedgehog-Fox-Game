import { Link } from 'react-router-dom';

const Guide = () => {
  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
          <h1>🦊 Fox & Hedgehog 🦔</h1>
          <p>Something wild is happening in the woods.</p>
          </div>
        </Link>
      </header>

      <div className="score-board-container">
        <h3>how to play 🎮</h3>
        
        <div>
          <h3 className="help">
            You have 30 seconds. 🦔
          </h3>
          <h3 className="help">
            Eat as many apples 🍎 & blueberries 🫐 as you can.
          </h3>
          <h3 className="help"> 
            Avoid the fox! 🦊
          </h3>
        </div>
      </div>
    </main>
  );
};

export default Guide;
