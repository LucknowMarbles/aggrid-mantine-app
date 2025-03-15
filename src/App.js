import React, { useEffect, useState, useCallback } from 'react'
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MantineProvider, Group, Text, Button } from "@mantine/core";
import axios from 'axios'
import LoginForm from './LoginForm';
import { ModalsProvider} from '@mantine/modals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import AppRoutes from './AppRoutes'


// ✅ Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// ✅ Custom Header Component with Mantine UI
const MantineHeader = () => {

  return (
    <MantineProvider>
      <ModalsProvider>
          <BrowserRouter>
                  <AppShell
                      header={{ height: 60 }}
                      padding="md"
                  >
                      <AppShell.Main>
                          <AppRoutes />
                      </AppShell.Main>
                  </AppShell>
          </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default MantineHeader;

