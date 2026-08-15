import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Coaches from './Coaches';

const mockT = {
  nav: { home: 'Home' },
  coaches: {
    title: 'Our Coaches',
    subtitle: 'Meet the team',
    showMore: 'Read More',
    showLess: 'Show Less'
  }
};

describe('Coaches Component', () => {
  it('renders section headers and coach names', () => {
    render(<Coaches t={mockT} />);
    expect(screen.getByText('Our Coaches')).toBeInTheDocument();
    expect(screen.getByText('Rebecca')).toBeInTheDocument();
    expect(screen.getByText('Sabrina')).toBeInTheDocument();
  });

  it('allows expanding and collapsing coach cards', () => {
    render(<Coaches t={mockT} />);
    const showMoreButtons = screen.getAllByText('Read More');
    expect(showMoreButtons.length).toBeGreaterThan(0);

    // Click to expand first expandable coach card
    fireEvent.click(showMoreButtons[0]);
    expect(screen.getByText('Show Less')).toBeInTheDocument();

    // Click to collapse back
    fireEvent.click(screen.getByText('Show Less'));
    expect(screen.getAllByText('Read More').length).toBeGreaterThan(0);
  });
});
