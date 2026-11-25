import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  Typography,
  Chip,
  ButtonGroup,
  Button,
} from "@mui/material";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
} from "lucide-react";
import { usePresentationStore } from "../../presentation/presentationStore";
import {
  playSceneSequence,
  pauseSceneSequence,
  setSequencePosition,
} from "../../animation/sequences";

export const PresenterToolbar: React.FC = () => {
  const {
    currentNodeId,
    history,
    mode,
    navigateToNode,
    goBack,
    resetPresentation,
    setPresentationMode,
  } = usePresentationStore();

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = async () => {
    if (isPlaying) {
      pauseSceneSequence();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      await playSceneSequence({ range: [0, 3] });
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    pauseSceneSequence();
    setSequencePosition(0);
    setIsPlaying(false);
    resetPresentation();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Error attempting fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: "rgba(17, 24, 39, 0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 16,
        padding: "8px 20px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 12, borderRight: "1px solid rgba(255,255,255,0.1)" }}>
        <Layers size={16} color="#38bdf8" />
        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
          Node:
        </Typography>
        <Chip
          label={currentNodeId}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
        />
      </div>

      <Tooltip title="Previous Node">
        <span>
          <IconButton
            size="small"
            onClick={goBack}
            disabled={history.length <= 1}
            sx={{ color: "text.primary" }}
          >
            <ChevronLeft size={20} />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Next Node (Advance)">
        <IconButton
          size="small"
          onClick={() => navigateToNode("concept-branch-1")}
          sx={{ color: "text.primary" }}
        >
          <ChevronRight size={20} />
        </IconButton>
      </Tooltip>

      <Tooltip title={isPlaying ? "Pause Sequence" : "Play Sequence (Theatre.js)"}>
        <IconButton
          size="small"
          onClick={handlePlayToggle}
          sx={{
            color: isPlaying ? "#f43f5e" : "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.1)",
            "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.2)" },
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Reset Presentation">
        <IconButton size="small" onClick={handleReset} sx={{ color: "text.secondary" }}>
          <RotateCcw size={18} />
        </IconButton>
      </Tooltip>

      <ButtonGroup size="small" variant="text" sx={{ ml: 1 }}>
        <Button
          onClick={() => setPresentationMode("presenter")}
          sx={{
            color: mode === "presenter" ? "primary.main" : "text.secondary",
            fontWeight: mode === "presenter" ? 700 : 400,
          }}
        >
          Presenter
        </Button>
        <Button
          onClick={() => setPresentationMode("preview")}
          sx={{
            color: mode === "preview" ? "primary.main" : "text.secondary",
            fontWeight: mode === "preview" ? 700 : 400,
          }}
        >
          Preview
        </Button>
      </ButtonGroup>

      <Tooltip title="Toggle Fullscreen">
        <IconButton size="small" onClick={toggleFullscreen} sx={{ color: "text.secondary" }}>
          <Maximize2 size={18} />
        </IconButton>
      </Tooltip>
    </div>
  );
};
