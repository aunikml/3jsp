import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { Search, SlidersHorizontal, RotateCcw, Layers } from "lucide-react";
import { Presentation, PillarCategory } from "../types/dashboard";
import { presentationService } from "../services/presentationService";
import { PresentationCard } from "../components/dashboard/PresentationCard";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const PresentationsPage: React.FC = () => {
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PillarCategory | "All">("All");
  const [sortBy, setSortBy] = useState<"recent" | "title" | "nodes">("recent");

  const categories: (PillarCategory | "All")[] = [
    "All",
    "Teaching & Learning",
    "Early Childhood & Play",
    "Mental Health",
    "Care & Compassion",
    "Climate Change",
  ];

  const fetchFiltered = useCallback(async () => {
    setLoading(true);
    const results = await presentationService.searchAndFilter(
      searchQuery,
      selectedCategory,
      sortBy
    );
    setPresentations(results);
    setLoading(false);
  }, [searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    fetchFiltered();
  }, [fetchFiltered]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("recent");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: isDark ? "#FFFFFF" : brandColors.pantone432,
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            My Presentations
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
            Explore and launch your interactive 3D presentations, simulations, and concept models.
          </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Chip
            icon={<Layers size={14} />}
            label={`${presentations.length} Presentations Available`}
            variant="outlined"
            size="small"
            sx={{
              borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
              color: isDark ? brandColors.pantoneCoolGray7 : brandColors.pantone432,
              fontWeight: 600,
            }}
          />
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "20px",
          borderRadius: 12,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        }}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color={isDark ? brandColors.pantoneCoolGray7 : "#64748B"} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F8FAFC",
                },
              }}
            />
          </div>

          {/* Sort By Dropdown */}
          <div style={{ width: 180 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value as "recent" | "title" | "nodes")}
                sx={{
                  backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F8FAFC",
                }}
              >
                <MenuItem value="recent">Recently Accessed</MenuItem>
                <MenuItem value="title">Title (A - Z)</MenuItem>
                <MenuItem value="nodes">Interactive Nodes</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", marginRight: 4 }}>
            Pillar Category:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={isSelected ? "filled" : "outlined"}
                size="small"
                sx={{
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? brandColors.pantoneOrange
                    : "transparent",
                  color: isSelected ? "#FFFFFF" : isDark ? "#CBD5E1" : brandColors.pantone432,
                  borderColor: isSelected
                    ? brandColors.pantoneOrange
                    : isDark
                    ? brandColors.darkBorder
                    : brandColors.lightBorder,
                  fontWeight: isSelected ? 700 : 500,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? brandColors.pantoneOrange
                      : isDark
                      ? "rgba(255,255,255,0.06)"
                      : "#F1F5F9",
                  },
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Presentation Cards Grid / Empty State */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Searching presentations...
          </Typography>
        </div>
      ) : presentations.length === 0 ? (
        <div
          style={{
            padding: "60px 24px",
            textAlign: "center",
            borderRadius: 12,
            backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
            border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#F1F5F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <SlidersHorizontal size={24} color={isDark ? brandColors.pantoneCoolGray7 : "#64748B"} />
          </div>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
            {searchQuery ? "No presentations match your search" : "No presentations in library"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
              maxWidth: 440,
              margin: "0 auto 20px auto",
            }}
          >
            {searchQuery
              ? `We couldn't find any presentations matching "${searchQuery}". Try adjusting your keywords.`
              : "All presentations have been deleted. New presentations will appear here once created."}
          </Typography>

          {searchQuery && (
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<RotateCcw size={16} />}
              sx={{ color: brandColors.pantoneOrange, borderColor: brandColors.pantoneOrange }}
            >
              Reset Filters
            </Button>
          )}
        </div>
      ) : (
        <Grid container spacing={3}>
          {presentations.map((p) => (
            <Grid item xs={12} sm={6} lg={4} key={p.id}>
              <PresentationCard presentation={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
