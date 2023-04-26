import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/pages/Home';

describe('Home', () => {
  it('Renders hello world', () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('MyKlad');
  });
});
