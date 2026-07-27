import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button'; 

describe('Button Component', () => {
  it('deve renderizar o botão com o texto correto', () => {

    render(<Button>Clique Aqui</Button>);
    const buttonElement = screen.getByText('Clique Aqui');
    expect(buttonElement).toBeInTheDocument();
  });

  it('deve chamar a função onClick quando for clicado', async () => {
    const handleClick = vi.fn(); 
    
    render(<Button onClick={handleClick}>Enviar</Button>);
    const buttonElement = screen.getByText('Enviar');

    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});