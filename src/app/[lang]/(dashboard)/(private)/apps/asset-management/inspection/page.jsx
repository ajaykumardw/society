// app/inspections/page.jsx
'use client';

import React from 'react';
import { Box, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const mockResults = [
    {
        _id: 'res_1',
        asset_id: { name: 'Dell Latitude 5420' },
        template_id: { name: 'Monthly IT Safety Checklist' },
        inspected_by: { name: 'Jane Smith' },
        inspection_date: '2026-02-15',
        overall_Status: 'Pass',
        remarks: 'All parameters normal.'
    }
];

export default function InspectionsPage() {
    const [tabIndex, setTabIndex] = React.useState(0);

    return (
        <Box sx={{ p: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>Inspection Management</Typography>

            <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 3 }}>
                <Tab label="Inspection Results (`inspection_result`)" />
                <Tab label="Templates Config (`inspection_template`)" />
            </Tabs>

            {tabIndex === 0 && (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Asset</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Template Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Inspected By</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockResults.map((res) => (
                                <TableRow key={res._id}>
                                    <TableCell fontWeight="bold">{res.asset_id.name}</TableCell>
                                    <TableCell>{res.template_id.name}</TableCell>
                                    <TableCell>{res.inspected_by.name}</TableCell>
                                    <TableCell>{res.inspection_date}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={res.overall_Status}
                                            color={res.overall_Status === 'Pass' ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{res.remarks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {tabIndex === 1 && (
                <Paper elevation={0} sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Configured Question Checklists</Typography>
                    <Typography variant="body2" color="text.secondary">Create questions dynamically using types: text, number, boolean, date.</Typography>
                </Paper>
            )}
        </Box>
    );
}
