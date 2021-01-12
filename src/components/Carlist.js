import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCar from './AddCar';

export default function Carlist () {

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCars();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars/')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
        if (window.confirm('Are you sure?')) {
        fetch(params.value, {
            method: 'DELETE'
        })
        .then(_ => getCars())
        .then(_ => handleOpen())
        .catch(err => console.error(err))
    }
    }

    const columns = [
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
            {
                field: '_links.self.href',
                headerName: '',
                width: 90,
                cellRendererFramework: params => <IconButton color='secondary' onClick={() => deleteCar(params)}>
                    <DeleteIcon fontSize='small'/>
                    </IconButton>
            }
    ]


    return(


        <div>
            <AddCar />
            <div className="ag-theme-material" style={ { height: 700, width: '60%', margin: 'auto' } }>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination='true'
                    paginationPageSize='10'
                >                
                </AgGridReact>
            </div>
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={2500}
                message='Car deleted successfully'
            />

        </div>
    )
}