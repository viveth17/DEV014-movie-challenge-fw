import React from 'react'
import styles from '../styles/ListOptions.module.css';

export interface Option {
    value: string;
    label: string;
}

export interface ListOptionsProps { // para almacenar las opciones a listar 
    title: string;
    options: Option[]; //almacena las opciones que se listaran en el <select>
    selectedOption: Option | null; // almacen la opcion seleccionada actualmente o null si no hay ninguna seleccionada
    onChange: (option: Option | null) => void; //funcion que se ejecuta cuando se selecciona una opcion del <select>
    onClear: () => void; // funcion que se ejecuta cuando el usuario borra la seleccion actual 
}
const ListOptions: React.FC<ListOptionsProps> = ({ title, options, selectedOption, onChange, onClear }) => {
    return (
        <div className={styles.container}>
            {/* Renderizar el titulo dinámiacamente  */}
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.selectContainer}>
                <select
                    className={styles.select}
                    value={selectedOption ? selectedOption.value : ''}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        const option = options.find(opt => opt.value === selectedValue) || null;
                        onChange(option);
                    }}
                >
                    <option value=""></option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className={styles.selectedOption}>
                    <button className={styles.clearButton} onClick={onClear}> Borrar</button>
                </div>
        </div>
        </div>
    );
};

export default ListOptions;