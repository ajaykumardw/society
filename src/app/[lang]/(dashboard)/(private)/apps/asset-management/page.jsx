'use client';

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Dialog,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    TextField,
    InputAdornment,
    Card,
    CardContent,
    DialogContent,
    DialogActions,
    DialogTitle,
} from '@mui/material';

import Grid from "@mui/material/Grid2"

import { useForm, Controller } from 'react-hook-form';

import { valibotResolver } from '@hookform/resolvers/valibot';

import { object, string, optional, pipe, nonOptional } from 'valibot';

import {
    Dashboard as DashboardIcon,
    Inventory2 as InventoryIcon,
    BuildCircle as MaintenanceIcon,
    AssignmentTurnedIn as InspectionIcon,
    LocationOn as LocationIcon,
    Search as SearchIcon,
    Add as AddIcon,
    LaptopMac,
    Router,
    Print
} from '@mui/icons-material';

import DialogCloseButton from '@/components/dialogs/DialogCloseButton';

const API_URL = process.env.NEXT_PUBLIC_API_URL

const initialFormState = {
    vendor_id: "",
    location_id: "",
    asset_category_id: "",
    name: "",
    brand: "",
    model: "",
    serial_number: "",
    purchase_date: "",
    purchase_cost: "",
    warranty_start: "",
    warranty_end: "",
    qr_code: "",
    bar_code: "",
    status: "Active",
    condition: "Good",
    depreciationValue: "",
    description: "",
    assigned_to: ""
};

// Define the Valibot schema for validation
const assetSchema = object({
    name: pipe(string(), nonOptional("Asset Name is required")),
    brand: optional(string()),
    model: optional(string()),
    serial_number: pipe(string(), nonOptional("Serial Number is required")),
    asset_category_id: pipe(string(), nonOptional("Category is required")),
    location_id: pipe(string(), nonOptional("Location is required")),
    vendor_id: optional(string()),
    assigned_to: optional(string()),
    purchase_date: optional(string()),
    purchase_cost: optional(string()),
    warranty_start: optional(string()),
    warranty_end: optional(string()),
    status: optional(string()),
    condition: optional(string()),
    depreciationValue: optional(string()),
    description: optional(string())
});

const AssetComponent = ({ open, setOpen, assetData }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: valibotResolver(assetSchema),
        defaultValues: initialFormState
    });

    // Reset form values when assetData or dialog state changes
    useEffect(() => {
        if (open) {
            if (assetData) {
                reset({ ...initialFormState, ...assetData });
            } else {
                reset(initialFormState);
            }
        }
    }, [assetData, open, reset]);

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) => {
        // Additional custom validation example (e.g. warranty dates)
        if (data.warranty_start && data.warranty_end && new Date(data.warranty_start) > new Date(data.warranty_end)) {
            // You can handle custom errors via setError if needed
            return;
        }

        console.log("Submitted Payload:", data);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    overflow: 'visible'
                }
            }}
        >
            <DialogTitle>
                {assetData ? "Edit Asset" : "Add Asset"}
            </DialogTitle>

            <DialogCloseButton onClick={handleClose}>
                <i className='tabler-x' />
            </DialogCloseButton>

            <DialogContent dividers>
                <Grid container spacing={3}>

                    {/* Asset Name */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Asset Name *"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Brand */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="brand"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Brand" />
                            )}
                        />
                    </Grid>

                    {/* Model */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="model"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Model" />
                            )}
                        />
                    </Grid>

                    {/* Serial Number */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="serial_number"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Serial Number *"
                                    error={!!errors.serial_number}
                                    helperText={errors.serial_number?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Category */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="asset_category_id"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Category *"
                                    error={!!errors.asset_category_id}
                                    helperText={errors.asset_category_id?.message}
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {assetData?.category?.map((item, index) => (
                                        <option value={item?._id} key={index}>{item?.name}</option>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Location */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="location_id"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Location *"
                                    error={!!errors.location_id}
                                    helperText={errors.location_id?.message}
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="" disabled>Select Location</option>
                                    {assetData?.location?.map((item, index) => (
                                        <option value={item?._id} key={index}>{item?.name}</option>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Vendor */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="vendor_id"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Vendor"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="">Select Vendor</option>
                                    {assetData?.vendor?.map((item, index) => (
                                        <option value={item?._id} key={index}>{item?.company_Name}</option>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Assigned To */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="assigned_to"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Assigned To"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="">Select User</option>
                                    {assetData?.users?.map((item, index) => (
                                        <option value={item?._id} key={index}>
                                            {item?.first_name} {item?.last_name} ({item?.phone})
                                        </option>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Purchase Date */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="purchase_date"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth type="date" label="Purchase Date" InputLabelProps={{ shrink: true }} />
                            )}
                        />
                    </Grid>

                    {/* Purchase Cost */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="purchase_cost"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Purchase Cost"
                                    type="number"
                                    error={!!errors.purchase_cost}
                                    helperText={errors.purchase_cost?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Warranty Start */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="warranty_start"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth type="date" label="Warranty Start" InputLabelProps={{ shrink: true }} />
                            )}
                        />
                    </Grid>

                    {/* Warranty End */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="warranty_end"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="date"
                                    label="Warranty End"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.warranty_end}
                                    helperText={errors.warranty_end?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Status */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Status"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Under Maintenance">Under Maintenance</option>
                                    <option value="Disposed">Disposed</option>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Condition */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="condition"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Condition"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Depreciation Value */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="depreciationValue"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="Depreciation Value" type="number" />
                            )}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item size={{ xs: 12 }}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth multiline rows={4} label="Description" />
                            )}
                        />
                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Save Asset
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default function AssetDashboard() {

    const { data: session } = useSession()
    const token = session?.user?.token

    const [assetData, setAssetData] = useState()
    const [loading, setLoading] = useState(true)

    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Under Maintenance': return 'warning';
            case 'Disposed': return 'error';
            default: return 'default';
        }
    };

    const getConditionColor = (condition) => {
        switch (condition) {
            case 'Excellent': return 'success';
            case 'Good': return 'info';
            case 'Fair': return 'warning';
            case 'Poor': return 'error';
            default: return 'default';
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true)

            const response = await fetch(`${API_URL}/company/asset/fetch/data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            if (response.ok) {

                setAssetData(result?.data);
            }

        } catch (error) {
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (API_URL && token) {
            fetchData()
        }
    }, [API_URL, token])

    return (
        <Box >

            {/* Main Dashboard Content */}
            <Box >
                <Toolbar />

                {/* Top Header & Actions */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" color="#0f172a">
                            Asset Inventory
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenDialog(true)
                        }}
                    >
                        Add New Asset
                    </Button>
                </Box>

                {/* Quick Summary Cards */}
                <Grid container spacing={3} mb={4}>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                            <CardContent>
                                <Typography color="text.secondary" variant="subtitle2">Total Assets</Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>1,248</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                            <CardContent>
                                <Typography color="text.secondary" variant="subtitle2">Active AMCs (`amc_log`)</Typography>
                                <Typography variant="h5" fontWeight="bold" color="success.main" sx={{ mt: 1 }}>342</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                            <CardContent>
                                <Typography color="text.secondary" variant="subtitle2">Under Maintenance</Typography>
                                <Typography variant="h5" fontWeight="bold" color="warning.main" sx={{ mt: 1 }}>18</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Search Bar & Filters */}
                <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by asset name, serial number, or model..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                    />
                </Paper>

                {/* Data Table for Assets Schema */}
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="assets table">
                        <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Asset Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Serial Number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Location (`asset_location`)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assetData?.assets?.map((asset) => (
                                <TableRow key={asset._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="body2" fontWeight="bold">{asset.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">{asset.brand} {asset.model}</Typography>
                                    </TableCell>
                                    <TableCell>{asset.category.name}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{asset.serial_number}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        {asset.location_id.building}, {asset.location_id.room}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={asset.condition} color={getConditionColor(asset.condition)} size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={asset.status} color={getStatusColor(asset.status)} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AssetComponent
                    open={openDialog}
                    setOpen={setOpenDialog}
                    assetData={assetData}
                />
            </Box>
        </Box>
    );
}
