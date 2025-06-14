"use client";

import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import CategoryCard from "@/components/categories/CategoryCard";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const CategoriesPage = () => {
  // Temporary mock data - will be replaced with API call
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest electronic gadgets",
      imageUrl: "/images/categories/electronics.jpg",
      slug: "electronics",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy fashion items",
      imageUrl: "/images/categories/fashion.jpg",
      slug: "fashion",
    },
    // Add more categories as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">Categories</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shop by Category
      </Typography>

      {/* Categories Grid */}
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage; 