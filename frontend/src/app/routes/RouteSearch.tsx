import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@nextui-org/react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Station } from "../models/station.model";
import {
  handleFilterClick,
  handleSwapStations,
} from "../handlers/route.search.handler";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, customSelectStyles } from "./routeSearchStyles";
interface RouteSearchProps {
  stations: Station[];
  selectedDepartureStation: string | null;
  setSelectedDepartureStation: (stationId: string | null) => void;
  selectedArrivalStation: string | null;
  setSelectedArrivalStation: (stationId: string | null) => void;
  dateOfDeparture: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  onFilter: () => void;
}

const RouteSearch: React.FC<RouteSearchProps> = ({
  stations,
  selectedDepartureStation,
  selectedArrivalStation,
  setSelectedDepartureStation,
  setSelectedArrivalStation,
  dateOfDeparture,
  onDateChange,
  onFilter,
}) => {
  const [error, setError] = useState<string | null>(null);

  const stationOptions = stations.map((station) => ({
    value: station._id ?? "",
    label: station.name,
  }));

  return (
    <>
      <h1>Search Routes</h1>
      <div className="flex flex-col items-center space-y-4 my-4">
        <Select
          options={stationOptions}
          value={stationOptions.find(
            (option) => option.value === selectedDepartureStation
          )}
          onChange={(selectedOption) => {
            setSelectedDepartureStation(
              selectedOption ? selectedOption.value : null
            );
          }}
          placeholder="Select Departure Station"
          styles={customSelectStyles}
          className="w-full md:w-2/3 lg:w-1/2 mx-auto"
        />
        <Button
          radius="full"
          onClick={() =>
            handleSwapStations(
              selectedDepartureStation,
              selectedArrivalStation,
              setSelectedDepartureStation,
              setSelectedArrivalStation
            )
          }
          isDisabled={!selectedDepartureStation || !selectedArrivalStation}
        >
          <SwapVertIcon />
        </Button>

        <Select
          options={stationOptions}
          value={stationOptions.find(
            (option) => option.value === selectedArrivalStation
          )}
          onChange={(selectedOption) => {
            setSelectedArrivalStation(
              selectedOption ? selectedOption.value : null
            );
          }}
          placeholder="Select Arrival Station"
          styles={customSelectStyles}
          className="w-full md:w-2/3 lg:w-1/2 mx-auto"
        />
      </div>
      <div className="flex justify-center space-x-4 my-4">
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MUIDatePicker
              label="Select Departure Date"
              className="w-full md:w-2/3 lg:w-1/2 mx-auto"
              value={dateOfDeparture}
              onChange={(date) => {
                onDateChange(date);
              }}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </div>
      {error && (
        <div className="flex justify-center my-4">
          <div style={{ color: "red" }}>{error}</div>
        </div>
      )}
      <div className="flex justify-center my-4">
        <Button
          isDisabled={!selectedDepartureStation || !selectedArrivalStation}
          onClick={() =>
            handleFilterClick(
              selectedDepartureStation,
              selectedArrivalStation,
              onFilter,
              setError
            )
          }
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default RouteSearch;