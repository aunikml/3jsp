import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PresentationPlayer } from "./PresentationPlayer";
import { LMSPresentation2D } from "./LMSPresentation2D";
import { InstructionalTechPresentation } from "./InstructionalTechPresentation";
import { presentationService } from "../services/presentationService";

/**
 * Controller component orchestrating presentation data loading,
 * synchronization, and player mounting based on presentation type.
 */
export const PresentationController: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug && slug !== "dev") {
      presentationService.recordPresentationLaunch(slug);
    }
  }, [slug]);

  // If explicitly navigating to the 2D LMS presentation
  if (slug === "intro-to-lms" || slug === "lms") {
    return <LMSPresentation2D />;
  }

  // If slug is explicitly 'dev', load 3D development scene
  if (slug === "dev") {
    return <PresentationPlayer />;
  }

  // Default to the new Hybrid 2D & 3D Instructional Technology Presentation
  // (matches slug "instructional-technology", empty slug, or default access)
  return <InstructionalTechPresentation />;
};
