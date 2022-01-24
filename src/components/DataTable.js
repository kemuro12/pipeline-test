import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { getInflux } from '../Redux/PointReducer';

const columns = [
  { id: '_time', label: 'Time', minWidth: 170 },
  { id: 'venue', label: 'Venue', minWidth: 100 },
  { id: 'id', label: 'Gate', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 },
  { id: '_value', label: 'Sum', minWidth: 100 }
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 640,
  },
});

const getParsedDate = time => {
    let date = new Date(time);
    let mo = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
    
    if(mo < 10) mo = '0' + mo;
    if(d < 10) d = '0' + d;
    if(h < 10) h = '0' + h;
    if(m < 10) m = '0' + m;
    if(s < 10) s = '0' + s;

    return `${d}.${mo} ${h}:${m}:${s}`;
}

const DataTable = props => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInflux(20, 1))
    },[])

    const influx = useSelector(state => state.points.influx);
    const influxData = influx.data || [];
    const count = influx.count || -1;

    let data = [];
    
    influxData.forEach(el => {
        let d = {
            ...el
        }
        d._time = getParsedDate(el._time)
        d.action = el.action == 1 ? "in" : el.action == 0 ? "Flush" : "out"
        data.push(d);
    })

    const handleChangePage = (event, newPage) => {
        dispatch(getInflux(rowsPerPage, newPage + 1))
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        dispatch(getInflux(event.target.value, 1))
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((el,index) => 
                            <TableRow hover tabIndex={-1} key={index}>
                                {columns.map((column) => {
                                    const value = el[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )
                    }
                </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default DataTable;