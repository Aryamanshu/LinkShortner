import LinkIcon from '@mui/icons-material/Link';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Padding, WidthFull } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import logo from "../../images/tinyhost.png";
import Image from 'next/image';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f3f4f6',
        color: '#898989',
        fontSize: 12,
        border: 0,
        padding: 11

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 11,
        border: 0,
        padding: 14
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Dashboard() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = anchorEl;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div style={{ backgroundColor: '#fbfbfb' }}>
            <div className='flex justify-center items-center' style={{ height: '10vh' }}>
                <div className='w-5/6 border rounded-2xl min-h-8 p-4 mt-10 bg-white shadow-[0_12px_41px_-11px_rgba(199,199,199)]'>
                    <div className='flex'>
                        <Image src={logo} alt="logo" style={{ height: '11%', width: '11%' }} />
                        <span className=' text-base cursor-pointer mt-4 font-sans text-slate-500 ml-10 mr-5'>Products</span>
                        <span className='text-base cursor-pointer mt-4 font-sans text-slate-500 mr-5'>Use Cases</span>
                        <span className='text-base cursor-pointer mt-4 font-sans text-slate-500 mr-5'>Blogs</span>
                        <button className='bg-purple-300 text-purple-700 font-medium ml-auto rounded-lg pt-1 pb-1 pl-2 pr-2 h-10 mt-2'>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
            <div class="text-[#333] rounded-lg font-[sans-serif] " style={{ height: '9vh' }}>
                <div className='w-full flex items-center justify-center mt-10 pt-10'>
                    <span class="mt-4 text-lg font-sans text-purple-700 font-medium">Your link :
                        <span className='text-sm text-gray-500 font-normal ml-2 mr-5'>  eli t. Duis accumsan, nunc ettempus blandit, metus mi consectetur nibh</span><Tooltip title="Copy">
                            <IconButton style={{ fontSize: 13, paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, borderRadius: 7, border: '1px solid #19a89d', color: '#19a89d', fontWeight: 700 }}>
                                Copy URL
                                <ContentCopyIcon size="sm" style={{ fontSize: 17, color: '#19a89d', marginLeft: 7 }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Generate QR Code">
                            <IconButton style={{ fontSize: 13, paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, borderRadius: 7, border: '1px solid #8a53fe', color: '#8a53fe', fontWeight: 700, marginLeft: 17 }}>
                                Generate QR Code
                                <QrCode2Icon size="sm" style={{ fontSize: 22, color: '#8a53fe', marginLeft: 7 }} />
                            </IconButton>
                        </Tooltip>
                    </span>
                </div>
            </div>
            <div className="flex justify-center items-center" style={{ height: '75vh' }}>
                <div className=" min-h-80 w-content bg-white border rounded-2xl shadow-[0_12px_41px_-11px_rgba(199,199,199)]">
                    <div className="mx-6 mt-5">
                        <div className="flex justify-between mt-6">
                            <div className='font-sans text-2xl font-medium subpixel-antialiased flex'>Live Links
                                <div className='bg-purple-200 text-purple-800 w-fit h-auto p-1 font-sans mt-1.5 ml-3 mb-2' style={{ borderRadius: 10 }}>
                                    <div className='font-sans mr-1 ml-1 text-xs font-base'>
                                        2/4  Live</div>
                                </div>
                            </div>
                            <button className="font-sans text-xs p-2 rounded-xl bg-black text-white ">
                                Add  Link <LinkIcon style={{ fontSize: 20, marginLeft: 2 }} />
                            </button>
                        </div>
                        <div className='font-sans mt-10 mb-4'>
                            <Table sx={{ minWidth: 400, border: 'none' }} aria-label="customized table" size='sm'>
                                <TableHead >
                                    <TableRow >
                                        <StyledTableCell align="left" style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} >Status</StyledTableCell>
                                        <StyledTableCell align="left">Domain</StyledTableCell>
                                        <StyledTableCell align="center" style={{ borderTopleftRadius: 15, borderBottomleftRadius: 15 }}>Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name} >
                                            <StyledTableCell align="left" style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
                                                <div className='bg-green-300 text-green-800 w-fit h-auto p-1 font-sans flex' style={{ borderRadius: 10 }}> <div className='bg-green-800 w-1 h-1 rounded-lg mt-1.5 ml-1 mr-1'>
                                                </div>
                                                    <div className='font-sans mr-1'>
                                                        Active</div>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell align="left" >{row.calories}</StyledTableCell>
                                            <StyledTableCell align="right" style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>  <div>
                                                <Tooltip title="Copy">
                                                    <IconButton style={{ paddingLeft: 0 }}>
                                                        <ContentCopyIcon size="sm" style={{ fontSize: 17 ,color: '#19a89d'}} />
                                                    </IconButton>
                                                </Tooltip>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                    size='sm'
                                                >
                                                    <MoreVertIcon size="sm" />
                                                </IconButton>
                                                <Menu
                                                    size="sm"
                                                    id="long-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    PaperProps={{
                                                        style: {
                                                            width: '6%',
                                                            boxShadow: 'none',
                                                            fontSize: 12,
                                                            border: '1px solid gray',
                                                            borderRadius: 15
                                                        },
                                                    }}
                                                >
                                                    <MenuItem size="sm" className="text-xs" onClick={handleClose}>
                                                        <LinkOffIcon className='mr-2' style={{ fontSize: 19, color: '#9074d3' }} />  In Active
                                                    </MenuItem>
                                                    <MenuItem size="sm" className="text-xs" onClick={handleClose}>
                                                        <EditIcon className='mr-2' style={{ fontSize: 19, color: '#36c6d5' }} /> Edit
                                                    </MenuItem>
                                                    <MenuItem size="sm" className="text-xs" onClick={handleClose}>
                                                        <DeleteIcon className='mr-2' style={{ fontSize: 19, color: '#fb8d8d' }} />  Delete
                                                    </MenuItem>
                                                </Menu>
                                            </div></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}