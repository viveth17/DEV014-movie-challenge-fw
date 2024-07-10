import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import styles from '../styles/Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onSelectPage: (page: number) => void;
   
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onSelectPage }) => {
    //Función que maneja el cambio de página (se ejecuta cada vez que el usuario hace clic en un boton de paginación)
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        //llamado de la función onSelectPage con el # de página seleccionado
        onSelectPage(value);
    };

    return (
        <Stack spacing={2} className={styles.container} >
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange} 
                shape="rounded"
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        disabled={
                            (item.type === 'previous' && currentPage === 1) ||
                            (item.type === 'next' && currentPage === totalPages)
                        }
                        className={`${styles.paginationItem} ${item.selected ? styles.paginationItemSelected : ''} ${(item.type === 'start-ellipsis' || item.type === 'end-ellipsis') ? styles.paginationItemDisabled : ''}`}
                    />
                )}
            />
        </Stack>
    );
};

export default PaginationComponent;





