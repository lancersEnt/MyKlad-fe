import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>Not found</h1>
      <nav>
        <li>
          <Link
                    preventScrollReset to="/"> Back to home page </Link>
        </li>
      </nav>
    </div>
  );
}

export default NotFound;
