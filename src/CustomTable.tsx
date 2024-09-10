import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useExecuteQuery } from "@sisense/sdk-ui";
import { measureFactory } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";
import { Button, Card, CardContent, Typography } from "@mui/material";

const abbreviateNumber = (value: number | undefined | null) => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "N/A"; 
  }
  
  if (value >= 1e9) {
    return (value / 1e9).toFixed(3) + "B"; 
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(3) + "M"; 
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(3) + "K"; 
  } else {
    return value.toFixed(3); 
  }
};

const CustomTable = () => {
  const gridRef = useRef<any>(null);
  const [rowData, setRowData] = useState<any[]>([]); 
  const columnDefs = useMemo(() => [
    { field: "country", headerName: "Country" },
    { field: "ageRange", headerName: "Age Range" },
    { field: "year", headerName: "Year" },
    {
      field: "revenue",
      headerName: "Total Revenue",
      valueFormatter: (params: any) => abbreviateNumber(params.value),
    },
    {
      field: "quantity",
      headerName: "Total Quantity",
      valueFormatter: (params: any) => abbreviateNumber(params.value),
    },
  ], []);
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  // Query configuration for Sisense API
  const queryProps = useMemo(() => ({
    dataSource: DM.DataSource,
    dimensions: [DM.Country.Country, DM.Commerce.AgeRange, DM.Commerce.Date.Years],
    measures: [
      measureFactory.sum(DM.Commerce.Revenue, "Total Revenue"),
      measureFactory.sum(DM.Commerce.Quantity, "Total Quantity"),
    ],
  }), []);

  const { data, isLoading, isError } = useExecuteQuery(queryProps);
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const rows = data.rows.map((row: any) => ({
        country: row[0]?.text || "N/A",
        ageRange: row[1]?.text || "N/A",
        year: row[2]?.text || "N/A",
        revenue: row[3]?.data || 0,
        quantity: row[4]?.data || 0,
      }));
      setRowData(rows);
    }
  }, [data, isLoading, isError]);

  const onBtnExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  }, []);

  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Typography variant="h5" component="div">
            Sales Table
          </Typography>
          <Button variant="contained" color="primary" onClick={onBtnExport}>
            Export to CSV
          </Button>
        </div>
        <div style={{ height: "500px", width: "100%" }} className="ag-theme-alpine">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <AgGridReact
              ref={gridRef} 
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomTable;
