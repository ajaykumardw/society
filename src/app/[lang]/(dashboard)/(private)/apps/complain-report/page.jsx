'use client'

import React, { useEffect, useMemo, useState } from 'react'

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
  Chip,
  IconButton
} from '@mui/material'

import Grid from '@mui/material/Grid2'

import {
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon
} from '@mui/icons-material'

export default function ComplaintReportDashboard() {
  const { data: session } = useSession()
  const token = session?.user?.token
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [data, setData] = useState({
    complain: [],
    towers: [],
    floors: [],
    statusData: [],
    users: [],
    category: []
  })

  const [filters, setFilters] = useState({
    tower: '',
    floor: '',
    category: '',
    status: '',
    assignedTo: '',
    resident: ''
  })

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/company/complain/report/data`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const result = await response.json()

      if (response.ok) {
        setData(result.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (API_URL && token) {
      fetchData()
    }
  }, [API_URL, token])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      tower: '',
      floor: '',
      category: '',
      status: '',
      assignedTo: '',
      resident: ''
    })
  }

  const filteredComplaints = useMemo(() => {
    return data.complain.filter(item => {
      const matchTower =
        !filters.tower || item?.tower?._id === filters.tower

      const matchFloor =
        !filters.floor || item?.floor?._id === filters.floor

      const matchCategory =
        !filters.category ||
        item?.ticket_type?._id === filters.category

      const matchStatus =
        !filters.status ||
        item?.latest_complain_user?.complaint_status ==
        filters.status

      const matchAssigned =
        !filters.assignedTo ||
        item?.assigned_user?._id === filters.assignedTo

      const matchResident =
        !filters.resident ||
        item?.resident_name
          ?.toLowerCase()
          .includes(filters.resident.toLowerCase())

      return (
        matchTower &&
        matchFloor &&
        matchCategory &&
        matchStatus &&
        matchAssigned &&
        matchResident
      )
    })
  }, [data.complain, filters])

  const getStatusColor = status => {
    switch (String(status)) {
      case '1':
        return 'success'
      case '0':
        return 'error'
      default:
        return 'default'
    }
  }

  const statusMap = {
    1: "Pending",
    2: "Assigned",
    3: "Resolved",
    4: "In progress"
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
        <Grid container spacing={2}>
          {/* Tower */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              label='Tower / Block'
              size='small'
              fullWidth
              value={filters.tower}
              onChange={e =>
                handleFilterChange('tower', e.target.value)
              }
            >
              <MenuItem value=''>All Towers</MenuItem>
              {data.towers.map(t => (
                <MenuItem key={t._id} value={t._id}>
                  {t.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Floor */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              label='Flat No.'
              size='small'
              fullWidth
              value={filters.floor}
              onChange={e =>
                handleFilterChange('floor', e.target.value)
              }
            >
              <MenuItem value=''>All Floors</MenuItem>
              {data.floors.map(f => (
                <MenuItem key={f._id} value={f._id}>
                  {f.floor_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Category */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              label='Category'
              size='small'
              fullWidth
              value={filters.category}
              onChange={e =>
                handleFilterChange('category', e.target.value)
              }
            >
              <MenuItem value=''>All Categories</MenuItem>
              {data.category.map(c => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Status */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              label='Status'
              size='small'
              fullWidth
              value={filters.status}
              onChange={e =>
                handleFilterChange('status', e.target.value)
              }
            >
              <MenuItem value=''>All Status</MenuItem>
              {data.statusData.map(s => (
                <MenuItem key={s.value} value={s.value}>
                  {s.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Assigned To */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              label='Assigned To'
              size='small'
              fullWidth
              value={filters.assignedTo}
              onChange={e =>
                handleFilterChange('assignedTo', e.target.value)
              }
            >
              <MenuItem value=''>All Staff</MenuItem>
              {data.users.map(u => (
                <MenuItem key={u._id} value={u._id}>
                  {u.name || u.email || u._id}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Resident */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              label='Resident Name'
              size='small'
              fullWidth
              value={filters.resident}
              onChange={e =>
                handleFilterChange('resident', e.target.value)
              }
            />
          </Grid>

          {/* Buttons */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1
            }}
          >
            <Button
              variant='contained'
              startIcon={<FilterIcon />}
            >
              Apply Filter
            </Button>

            <Button
              variant='outlined'
              startIcon={<RefreshIcon />}
              onClick={resetFilters}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant='body2'>
                Total Complaints
              </Typography>
              <Typography variant='h5'>
                {data.complain.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant='body2'>
                Filtered Complaints
              </Typography>
              <Typography variant='h5'>
                {filteredComplaints.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table */}
      <Paper elevation={0}>
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e2e8f0'
          }}
        >
          <Typography variant='h6'>
            Complaint Details
          </Typography>
        </Box>

        <TableContainer>
          <Table size='small'>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell>Complaint No</TableCell>
                <TableCell>Resident</TableCell>
                <TableCell>Nature</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map(row => (
                  <TableRow key={row._id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {row.complain_no || row._id}
                    </TableCell>

                    <TableCell>
                      {row.created_by.first_name || '-'} {row.created_by.last_name}
                    </TableCell>

                    <TableCell>
                      {row?.category?.name}
                    </TableCell>

                    <TableCell>
                      {row.nature_data?.title || '-'}
                    </TableCell>

                    <TableCell>
                      {row.description || '-'}
                    </TableCell>

                    <TableCell>
                      {row.assigned_to?.user?.first_name} {row.assigned_to?.user?.last_name}
                    </TableCell>

                    <TableCell>
                      {statusMap[row?.latest_complain_user?.complaint_status]}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align='center'
                    sx={{ py: 4 }}
                  >
                    No complaints found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
