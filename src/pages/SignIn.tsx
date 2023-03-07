import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div>
      <h1>Sign in</h1>
      <nav>
        <li>
          <Link to="/"> Back to home page </Link>
        </li>
      </nav>
    </div>
  );
}

export default SignIn;
