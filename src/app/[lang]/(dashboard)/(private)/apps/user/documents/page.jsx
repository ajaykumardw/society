'use client';

import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    alpha,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const categories = [
    {
        id: 1,
        name: "Meeting Minutes",
        count: 12,
        updated: "02 Sep 2026",
    },
    {
        id: 2,
        name: "Forms & Applications",
        count: 8,
        updated: "30 Aug 2026",
    },
    {
        id: 3,
        name: "Rules & Regulations",
        count: 5,
        updated: "18 Aug 2026",
    },
    {
        id: 4,
        name: "Notices",
        count: 15,
        updated: "01 Sep 2026",
    },
];

const allDocuments = [
    {
        id: 1,
        title: "AGM Meeting Minutes - Aug 2026.pdf",
        category: "Meeting Minutes",
        uploaded: "02 Sep 2026",
    },
    {
        id: 2,
        title: "Monthly Committee Meeting - July 2026.pdf",
        category: "Meeting Minutes",
        uploaded: "15 Jul 2026",
    },
    {
        id: 3,
        title: "Annual Budget Meeting Minutes.pdf",
        category: "Meeting Minutes",
        uploaded: "10 Jun 2026",
    },
    {
        id: 4,
        title: "Parking Request Form.pdf",
        category: "Forms & Applications",
        uploaded: "30 Aug 2026",
    },
    {
        id: 5,
        title: "Clubhouse Booking Form.pdf",
        category: "Forms & Applications",
        uploaded: "20 Aug 2026",
    },
    {
        id: 6,
        title: "Society Rules.pdf",
        category: "Rules & Regulations",
        uploaded: "18 Aug 2026",
    },
    {
        id: 7,
        title: "Maintenance Notice - September.pdf",
        category: "Notices",
        uploaded: "01 Sep 2026",
    },
    {
        id: 8,
        title: "Water Shutdown Notice.pdf",
        category: "Notices",
        uploaded: "25 Aug 2026",
    },
];

const UserDocumentsPage = () => {

    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDocuments = allDocuments.filter((doc) => {
        const matchesCategory = doc.category === selectedCategory;
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchQuery.toLowerCase());

        // If user is searching, look through all documents, otherwise filter by selected category
        if (searchQuery.trim() !== "") {
            return matchesSearch;
        }

        return matchesCategory;
    });

    return (
        <Box sx={{ inlineSize: "100%", px: { xs: 2, md: 4 }, py: 4, overflowX: "hidden" }}>
            <Stack spacing={4}>
                {/* Header */}
                <Box>
                    <Typography variant="h4" fontWeight={800} color="text.primary" letterSpacing="-0.5px">
                        Society Documents
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt={0.5}>
                        Browse and download official documents, notices, and records uploaded by your society.
                    </Typography>
                </Box>

                {/* Search */}
                <TextField
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents by title, category, or keyword..."
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "background.paper",
                            borderRadius: 3,
                            transition: "all 0.2s ease-in-out",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                            "& fieldset": { borderColor: "divider" },
                            "&:hover fieldset": { borderColor: "primary.main" },
                            "&.Mui-focused fieldset": { borderWidth: "2px" },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Categories Cards Section */}
                <Box>
                    <Typography variant="h6" fontWeight={700} mb={2.5}>
                        Categories
                    </Typography>

                    <Grid container spacing={3}>
                        {categories.map((item) => {
                            const isSelected = selectedCategory === item.name && !searchQuery;
                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
                                    <Card
                                        elevation={0}
                                        onClick={() => {
                                            setSelectedCategory(item.name);
                                            setSearchQuery(""); // Clear search when switching categories directly
                                        }}
                                        sx={{
                                            height: "100%",
                                            cursor: "pointer",
                                            borderRadius: 3,
                                            border: "2px solid",
                                            borderColor: isSelected ? "primary.main" : "divider",
                                            backgroundColor: isSelected
                                                ? (theme) => alpha(theme.palette.primary.main, 0.03)
                                                : "background.paper",
                                            transition: "all 0.25s ease-in-out",
                                            "&:hover": {
                                                borderColor: "primary.main",
                                                boxShadow: (theme) => `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.1)}`,
                                                transform: "translateY(-4px)",
                                                "& .category-arrow": {
                                                    transform: "translateX(3px)",
                                                    color: "primary.main",
                                                },
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Box
                                                    sx={{
                                                        p: 1.25,
                                                        borderRadius: 2,
                                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <FolderIcon color="primary" fontSize="medium" />
                                                </Box>

                                                <ArrowForwardIosIcon
                                                    className="category-arrow"
                                                    fontSize="small"
                                                    color="action"
                                                    sx={{
                                                        transition: "all 0.2s ease",
                                                        transform: isSelected ? "rotate(90deg)" : "none"
                                                    }}
                                                />
                                            </Stack>

                                            <Typography mt={2.5} variant="subtitle1" fontWeight={700} color="text.primary">
                                                {item.name}
                                            </Typography>

                                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt="auto" pt={2}>
                                                <Chip
                                                    label={`${item.count} Files`}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 600,
                                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                        color: "primary.main",
                                                    }}
                                                />
                                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                    {item.updated}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                {/* Documents List View for Selected Category / Search */}
                <Box>
                    <Typography variant="h6" fontWeight={700} mb={2.5}>
                        {searchQuery ? `Search Results (${filteredDocuments.length})` : `${selectedCategory} Documents`}
                    </Typography>

                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            overflow: "hidden",
                        }}
                    >
                        {filteredDocuments.length > 0 ? (
                            <List disablePadding>
                                {filteredDocuments.map((doc, index, arr) => (
                                    <Box key={doc.id}>
                                        <ListItem
                                            sx={{
                                                py: 2,
                                                px: 3,
                                                transition: "background-color 0.2s",
                                                "&:hover": {
                                                    backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.5),
                                                },
                                            }}
                                            secondaryAction={
                                                <Stack direction="row" spacing={1}>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        sx={{
                                                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                            "&:hover": { backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15) },
                                                        }}
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>

                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        sx={{
                                                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                            "&:hover": { backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15) },
                                                        }}
                                                    >
                                                        <DownloadIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            }
                                        >
                                            <ListItemIcon sx={{ minWidth: 48 }}>
                                                <Box
                                                    sx={{
                                                        p: 1,
                                                        borderRadius: 2,
                                                        backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                                                        display: "flex",
                                                    }}
                                                >
                                                    <DescriptionIcon color="error" fontSize="small" />
                                                </Box>
                                            </ListItemIcon>

                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2" fontWeight={600} color="text.primary">
                                                        {doc.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                        {doc.category} &bull; Uploaded {doc.uploaded}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>

                                        {index !== arr.length - 1 && <Divider component="li" />}
                                    </Box>
                                ))}
                            </List>
                        ) : (
                            <Box sx={{ p: 4, textAlign: "center" }}>
                                <Typography variant="body1" color="text.secondary">
                                    No documents found under this category or search query.
                                </Typography>
                            </Box>
                        )}
                    </Card>
                </Box>
            </Stack>
        </Box>
    );
};

export default UserDocumentsPage;
