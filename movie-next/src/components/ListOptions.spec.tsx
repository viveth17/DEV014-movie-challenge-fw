import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ListOptions, { Option } from './ListOptions';


describe('ListOptions', () => {
  const mockOptions: Option[] = [
    { value: 'popularity.desc', label: 'Más popular Desc' },
    { value: 'popularity.asc', label: 'Más popular Asc' },
  ];

  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el título correctamente', () => {
    render(
      <ListOptions
              id="test" 
              title="Título de prueba"
              options={mockOptions}
              selectedOption={null}
              onChange={mockOnChange}
              onClear={mockOnClear}
            />
      );

    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
  });

  it('debería mostrar las opciones en el <select>', () => {
      render(
          <ListOptions
              id="test" 
              title="Título de prueba"
              options={mockOptions}
              selectedOption={null}
              onChange={mockOnChange}
              onClear={mockOnClear}
          />
      );

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
      expect(select).toHaveDisplayValue(''); // Verifica la opción vacía inicial
      expect(screen.getByText('Más popular Desc')).toBeInTheDocument();
      expect(screen.getByText('Más popular Asc')).toBeInTheDocument();
  });

  it('debería seleccionar una opción correctamente', () => {
      render(
          <ListOptions
              id="test" 
              title="Título de prueba"
              options={mockOptions}
              selectedOption={null}
              onChange={mockOnChange}
              onClear={mockOnClear}
          />
      );

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'popularity.desc' } });

      expect(mockOnChange).toHaveBeenCalledWith({ value: 'popularity.desc', label: 'Más popular Desc' });
  });

  it('debería llamar a onClear al hacer clic en el botón "Borrar"', () => {
      render(
          <ListOptions
              id="test" 
              title="Título de prueba"
              options={mockOptions}
              selectedOption={mockOptions[0]}
              onChange={mockOnChange}
              onClear={mockOnClear}
          />
      );

      const clearButton = screen.getByText('Borrar');
      fireEvent.click(clearButton);

      expect(mockOnClear).toHaveBeenCalled();
  });

  it('debería mostrar la opción seleccionada en el <select>', () => {
      render(
          <ListOptions
              id="test" 
              title="Título de prueba"
              options={mockOptions}
              selectedOption={mockOptions[0]}
              onChange={mockOnChange}
              onClear={mockOnClear}
          />
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveDisplayValue('Más popular Desc');
  });

  it('debería manejar adecuadamente la selección nula', () => {
      render(
          <ListOptions
              id="test" 
              title="Título de prueba"
              options={mockOptions}
              selectedOption={null}
              onChange={mockOnChange}
              onClear={mockOnClear}
          />
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveDisplayValue(''); // Verifica la opción vacía inicial
  });

});

