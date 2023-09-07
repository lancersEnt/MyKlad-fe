import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <nav>
        <li>
          <Link preventScrollReset to="/">
            Retourner vers la page d&apos;acceuil
          </Link>
        </li>
      </nav>
    </div>
  );
}

export default Unauthorized;
