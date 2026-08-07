"use client";

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react'

import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    InputAdornment,
    Chip,
    IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    FilterList as FilterIcon,
    Refresh as RefreshIcon,
    GetApp as ExportIcon,
    Visibility as ViewIcon,
    ChevronLeft,
    ChevronRight,
} from '@mui/icons-material';

export default function ComplaintReportDashboard() {

    const { data: session } = useSession()
    const token = session?.user?.token
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const [startDate, setStartDate] = useState(new Date("2026-08-01"));
    const [endDate, setEndDate] = useState(new Date("2026-08-07"));

    const [data, setData] = useState();

    const fetchData = async () => {
        try {

            const response = await fetch(`${API_URL}/company/complain/report/data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json();

            if (response.ok) {

                setData(result?.data);
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {

        if (API_URL && token) {
            fetchData();
        }
    }, [API_URL, token])


    return (
        <Box sx={{ display: 'flex', bgcolor: '#f4f6f8', minHeight: '100vh', width: '100%' }}>
            {/* Main Wrapper */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* Main Content Body */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    {/* Filters Section */}
                    <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2 }} elevation={0}>
                        <Grid container spacing={2} alignItems="center">

                            {/* Date Picker Filter */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <DatePicker
                                    selectsRange
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(dates) => {
                                        const [start, end] = dates;
                                        setStartDate(start);
                                        setEndDate(end);
                                    }}
                                    dateFormat="dd MMM yyyy"
                                    customInput={
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Date Range"
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <CalendarTodayIcon fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    }
                                />
                            </Grid>

                            {/* Tower / Block */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField select label="Tower / Block" size="small" fullWidth defaultValue="All Towers">
                                    <MenuItem key={"all_tower"} value="All Towers" disabled>Select any tower</MenuItem>
                                    {
                                        data?.towers?.map(t => (

                                            < MenuItem key={t?._id}>{t?.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>

                            {/* Flat No. */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField select label="Flat No." size="small" fullWidth defaultValue="All Flats">
                                    <MenuItem key={"all_floores"} value="All Floors" disabled>All Flats</MenuItem>
                                    
                                </TextField>
                            </Grid>

                            {/* Category */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField select label="Category" size="small" fullWidth defaultValue="All Categories">
                                    <MenuItem value="All Categories">All Categories</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Status */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField select label="Status" size="small" fullWidth defaultValue="All Statuses">
                                    <MenuItem value="All Statuses">All Statuses</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Priority */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField select label="Priority" size="small" fullWidth defaultValue="All Priorities">
                                    <MenuItem value="All Priorities">All Priorities</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Assigned To */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField select label="Assigned To" size="small" fullWidth defaultValue="All Staff">
                                    <MenuItem value="All Staff">All Staff</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Resident Name Search */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField label="Resident Name" size="small" fullWidth placeholder="Search Resident" />
                            </Grid>

                            {/* Action Buttons */}
                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1 }}>
                                <Button variant="contained" startIcon={<FilterIcon />} sx={{ textTransform: 'none' }}>
                                    Apply Filter
                                </Button>
                                <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                                    Reset
                                </Button>
                                <Button variant="outlined" startIcon={<ExportIcon />} sx={{ textTransform: 'none' }}>
                                    Export Report
                                </Button>
                            </Grid>

                        </Grid>
                    </Paper>

                    {/* Metric Cards */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {[
                            { title: 'Total Complaints', count: '128', sub: '100%', color: '#2563eb' },
                            { title: 'Open', count: '34', sub: '26.56%', color: '#d97706' },
                            { title: 'In Progress', count: '28', sub: '21.88%', color: '#7c3aed' },
                            { title: 'Resolved', count: '52', sub: '40.63%', color: '#10b981' },
                            { title: 'Closed', count: '14', sub: '10.94%', color: '#64748b' },
                            { title: 'High Priority', count: '18', sub: '14.06%', color: '#ef4444' },
                        ].map((card, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
                                <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid #e2e8f0', height: '100%' }}>
                                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, my: 0.5 }}>
                                            {card.count}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: card.color, fontWeight: 600 }}>
                                            {card.sub}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Complaint Details Table */}
                    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }} elevation={0}>
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Complaint Details</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" color="text.secondary">Sort By:</Typography>
                                <TextField select size="small" defaultValue="Date (Newest)" sx={{ width: 150 }}>
                                    <MenuItem value="Date (Newest)">Date (Newest)</MenuItem>
                                </TextField>
                                <IconButton size="small"><FilterIcon /></IconButton>
                            </Box>
                        </Box>

                        <TableContainer>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600 }}>Complaint ID</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Resident Name</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Flat No.</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Assigned To</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Resolution Date</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        { id: 'CMP-100128', date: '07 Aug 2026, 10:30 AM', name: 'John Smith', flat: 'A-101', cat: 'Plumbing', sub: 'Water leakage in kitchen', pri: 'High', assigned: 'Maintenance Team', status: 'Resolved', resDate: '07 Aug 2026', priColor: 'error', statusColor: 'success' },
                                        { id: 'CMP-100127', date: '07 Aug 2026, 09:15 AM', name: 'Sarah Lee', flat: 'B-205', cat: 'Lift', sub: 'Lift not working', pri: 'Medium', assigned: 'Lift Vendor', status: 'In Progress', resDate: '-', priColor: 'warning', statusColor: 'info' },
                                        { id: 'CMP-100126', date: '07 Aug 2026, 08:40 AM', name: 'David Kumar', flat: 'C-302', cat: 'Security', sub: 'Stranger roaming in parking', pri: 'High', assigned: 'Security Supervisor', status: 'Open', resDate: '-', priColor: 'error', statusColor: 'warning' },
                                        { id: 'CMP-100125', date: '06 Aug 2026, 07:20 PM', name: 'Priya Sharma', flat: 'A-502', cat: 'Electrical', sub: 'Power fluctuation in room', pri: 'Medium', assigned: 'Electrician', status: 'Resolved', resDate: '06 Aug 2026', priColor: 'warning', statusColor: 'success' },
                                        { id: 'CMP-100124', date: '06 Aug 2026, 06:05 PM', name: 'Michael D’souza', flat: 'B-110', cat: 'Housekeeping', sub: 'Garbage not collected', pri: 'Low', assigned: 'Housekeeping Staff', status: 'Closed', resDate: '06 Aug 2026', priColor: 'default', statusColor: 'default' },
                                    ].map((row, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell sx={{ color: '#2563eb', fontWeight: 500 }}>{row.id}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.flat}</TableCell>
                                            <TableCell>{row.cat}</TableCell>
                                            <TableCell>{row.sub}</TableCell>
                                            <TableCell><Chip label={row.pri} color={row.priColor} size="small" variant="outlined" /></TableCell>
                                            <TableCell>{row.assigned}</TableCell>
                                            <TableCell><Chip label={row.status} color={row.statusColor} size="small" /></TableCell>
                                            <TableCell>{row.resDate}</TableCell>
                                            <TableCell>
                                                <IconButton size="small" color="primary"><ViewIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination Footer */}
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', flexWrap: 'wrap', gap: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Showing 1 to 10 of 128 entries
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton size="small" disabled><ChevronLeft /></IconButton>
                                <Button variant="contained" size="small" sx={{ minWidth: 30, height: 30, p: 0, bgcolor: '#2563eb' }}>1</Button>
                                <Button variant="text" size="small" sx={{ minWidth: 30, height: 30, p: 0, color: 'text.primary' }}>2</Button>
                                <Button variant="text" size="small" sx={{ minWidth: 30, height: 30, p: 0, color: 'text.primary' }}>3</Button>
                                <Typography variant="body2" color="text.secondary">...</Typography>
                                <Button variant="text" size="small" sx={{ minWidth: 30, height: 30, p: 0, color: 'text.primary' }}>13</Button>
                                <IconButton size="small"><ChevronRight /></IconButton>

                                <TextField select size="small" defaultValue={10} sx={{ width: 90, ml: 2 }}>
                                    <MenuItem value={10}>10 / page</MenuItem>
                                </TextField>
                            </Box>
                        </Box>
                    </Paper>

                </Box>
            </Box>
        </Box >
    );
}
