// app/amc/page.jsx
'use client';

import React from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Button, Toolbar
} from '@mui/material';
import { Add as AddIcon, Assignment } from '@mui/icons-material';

const mockAMCs = [
    {
        _id: 'amc_01',
        asset_id: { name: 'Dell Latitude 5420' },
        vendor_id: { name: 'TechWorld Solutions' },
        contact_no: '+1-555-0192',
        start_date: '2025-01-15',
        end_date: '2026-01-15',
        amount: 350,
        service_frequency: 'Yearly',
        status: 'Active'
    },
    {
        _id: 'amc_02',
        asset_id: { name: 'HVAC Industrial Unit 01' },
        vendor_id: { name: 'CoolAir Maintenance' },
        contact_no: '+1-555-8821',
        start_date: '2024-06-01',
        end_date: '2025-06-01',
        amount: 1200,
        service_frequency: 'Half-Yearly',
        status: 'Expired'
    }
];

export default function AMCLogsPage() {
    return (
        <Box sx={{ p: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">AMC & Maintenance Logs</Typography>
                    <Typography variant="body2" color="text.secondary">Track annual maintenance contracts, vendors, and expiration dates.</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>Add AMC Contract</Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Asset</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Vendor</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Contact No</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Frequency</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Contract Period</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockAMCs.map((amc) => (
                            <TableRow key={amc._id}>
                                <TableCell fontWeight="bold">{amc.asset_id.name}</TableCell>
                                <TableCell>{amc.vendor_id.name}</TableCell>
                                <TableCell>{amc.contact_no}</TableCell>
                                <TableCell><Chip label={amc.service_frequency} size="small" variant="outlined" /></TableCell>
                                <TableCell>{amc.start_date} to {amc.end_date}</TableCell>
                                <TableCell>${amc.amount}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={amc.status}
                                        color={amc.status === 'Active' ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
