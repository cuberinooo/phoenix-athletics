import React from 'react';
import { render, screen } from '@testing-library/react';
import Coaches from './Coaches';

const mockT = {
  nav: { home: 'Home' },
  coaches: {
    title: 'Our Coaches',
    subtitle: 'Meet the team'
  }
};

describe('Coaches Component', () => {
  it('renders section headers and coach names', () => {
    render(<Coaches t={mockT} />);
    expect(screen.getByText('Our Coaches')).toBeInTheDocument();
    expect(screen.getByText('Rebecca')).toBeInTheDocument();
    expect(screen.getByText('Sabrina')).toBeInTheDocument();
  });

  it('shows every coach bio and certification in full, without a read-more toggle', () => {
    render(<Coaches t={mockT} />);
    // Last sentence of the longest bio: used to be clipped behind "Read More".
    expect(
      screen.getByText(/she finds great joy in helping others improve their technique/)
    ).toBeInTheDocument();
    expect(screen.getByText('Ernährungsberaterin')).toBeInTheDocument();
    expect(screen.queryByText('Read More')).not.toBeInTheDocument();
  });
});
