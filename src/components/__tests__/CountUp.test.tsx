import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CountUp } from '../CountUp';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

describe('CountUp Component', () => {
  it('renders with initial value', () => {
    render(<CountUp end={5000} />);
    expect(screen.getByText(/0|5,000/)).toBeInTheDocument();
  });

  it('displays prefix and suffix', () => {
    render(<CountUp end={100} prefix="RM " suffix="+" className="test-class" />);
    const element = screen.getByText(/RM.*\+/);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('test-class');
  });

  it('applies custom className', () => {
    const { container } = render(<CountUp end={100} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
