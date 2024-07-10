import React from 'react'
import styles from '../styles/ListOptions.module.css';

export interface Option {
    value: string;
    label: string;
}

export interface ListOptionsProps { 
    id: string; 
    title: string;
    options: Option[]; 
    selectedOption: Option | null; 
    onChange: (option: Option | null) => void; 
    onClear: () => void; 
}
const ListOptions: React.FC<ListOptionsProps> = ({ id, title, options, selectedOption, onChange, onClear }) => {
    return (
        <div id={id} className={styles.container}>
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