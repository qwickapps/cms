/**
 * Custom Dashboard for QwickPress Admin
 *
 * A rich, modern dashboard with colorful cards showing stats and quick actions
 * Uses QwickApps React Framework for consistent styling
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import type { AdminViewProps } from 'payload';
import { DashboardContent } from './DashboardContent';
import './styles/Dashboard.css';

export const Dashboard: React.FC<AdminViewProps> = () => {
  return <DashboardContent />;
};

