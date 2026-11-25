import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Plus,
  Trash2,
  Calendar,
} from "lucide-react";
import { PresentationAccessRecord, User, Presentation } from "../types/dashboard";
import { accessService } from "../services/accessService";
import { presentationService } from "../services/presentationService";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const AccessManagementPage: React.FC = () => {
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [records, setRecords] = useState<PresentationAccessRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [selectedRole, setSelectedRole] = useState<"viewer" | "presenter" | "admin">("viewer");
  const [selectedExpires, setSelectedExpires] = useState("2026-12-31");

  const loadData = async () => {
    const [recs, usrs, pres] = await Promise.all([
      accessService.getAccessRecords(),
      accessService.getUsers(),
      presentationService.getAllPresentations(),
    ]);
    setRecords(recs);
    setUsers(usrs);
    setPresentations(pres);
    if (usrs.length > 0) setSelectedUserId(usrs[0].id);
    if (pres.length > 0) setSelectedSlug(pres[0].slug);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRevoke = async (recordId: string) => {
    await accessService.revokeAccess(recordId);
    setRecords((prev) => prev.filter((r) => r.id !== recordId));
  };

  const handleToggleStatus = async (recordId: string) => {
    await accessService.toggleAccessStatus(recordId);
    setRecords((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleRoleChange = async (
    recordId: string,
    role: "viewer" | "presenter" | "admin"
  ) => {
    await accessService.updateRole(recordId, role);
    setRecords((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, accessRole: role } : r))
    );
  };

  const handleGrantAccess = async () => {
    if (!selectedUserId || !selectedSlug) return;
    const newRecord = await accessService.grantAccess({
      userId: selectedUserId,
      presentationSlug: selectedSlug,
      role: selectedRole,
      expirationDate: selectedExpires || null,
    });
    setRecords((prev) => [newRecord, ...prev]);
    setOpenDialog(false);
  };

  const filteredRecords = records.filter(
    (r) =>
      r.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.presentationTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
            Access Management
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
            Manage user permissions, presenter privileges, and presentation security policies.
          </Typography>
        </div>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          startIcon={<Plus size={18} />}
          sx={{
            backgroundColor: brandColors.pantoneOrange,
            fontWeight: 700,
            px: 2.5,
          }}
        >
          Grant New Access
        </Button>
      </div>

      <div
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Filter by user name, email, or presentation title..."
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

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F8FAFC" }}>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                User / Account
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                Target Presentation
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                Access Role
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                Expiration Date
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                Status
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 6 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 0.5 }}>
                    No access records found
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8" }}>
                    Click "Grant New Access" above to assign presentation roles to users.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
              <TableRow
                key={record.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
                }}
              >
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: brandColors.pantone432,
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                    >
                      {record.user.avatarInitials}
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                        {record.user.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                        {record.user.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                    {record.presentationTitle}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace", color: brandColors.pantoneOrange }}>
                    {record.presentationSlug}
                  </Typography>
                </TableCell>

                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={record.accessRole}
                      onChange={(e) => handleRoleChange(record.id, e.target.value as "viewer" | "presenter" | "admin")}
                      sx={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        height: 32,
                        backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F1F5F9",
                      }}
                    >
                      <MenuItem value="viewer">Viewer</MenuItem>
                      <MenuItem value="presenter">Presenter</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={15} color={isDark ? brandColors.pantoneCoolGray7 : "#64748B"} />
                    <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                      {record.expirationDate || "Never (Permanent)"}
                    </Typography>
                  </div>
                </TableCell>

                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Switch
                      size="small"
                      checked={record.isActive}
                      onChange={() => handleToggleStatus(record.id)}
                      color="primary"
                    />
                    <Chip
                      label={record.isActive ? "Active" : "Disabled"}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        height: 20,
                        backgroundColor: record.isActive
                          ? "rgba(141, 198, 63, 0.15)"
                          : "rgba(244, 63, 94, 0.15)",
                        color: record.isActive ? brandColors.mentalHealth : "#F43F5E",
                        fontWeight: 700,
                      }}
                    />
                  </div>
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Revoke access record">
                    <IconButton
                      size="small"
                      onClick={() => handleRevoke(record.id)}
                      sx={{
                        color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8",
                        "&:hover": { color: "#F43F5E" },
                      }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
            backgroundImage: "none",
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
          Grant Presentation Access
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: "16px !important" }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUserId}
              label="Select User"
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              {users.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.name} ({u.email}) — {u.department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Target Presentation</InputLabel>
            <Select
              value={selectedSlug}
              label="Target Presentation"
              onChange={(e) => setSelectedSlug(e.target.value)}
            >
              {presentations.map((p) => (
                <MenuItem key={p.slug} value={p.slug}>
                  {p.title} ({p.category})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Access Role</InputLabel>
            <Select
              value={selectedRole}
              label="Access Role"
              onChange={(e) => setSelectedRole(e.target.value as "viewer" | "presenter" | "admin")}
            >
              <MenuItem value="viewer">Viewer (Can view and interact)</MenuItem>
              <MenuItem value="presenter">Presenter (Can control flow & nodes)</MenuItem>
              <MenuItem value="admin">Admin (Full administrative privileges)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            label="Expiration Date"
            type="date"
            value={selectedExpires}
            onChange={(e) => setSelectedExpires(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleGrantAccess}
            sx={{ backgroundColor: brandColors.pantoneOrange, fontWeight: 700 }}
          >
            Confirm Grant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
