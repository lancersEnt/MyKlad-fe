import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>MyKlad</h1>
      <nav>
        <li>
          <Link to="/signin"> signin </Link>
        </li>
        <li>
          <Link to="/signup"> signup </Link>
        </li>
        <li>
          <Link to="/signup"> logout </Link>
        </li>
      </nav>
    </div>
  );
}

export default Home;
