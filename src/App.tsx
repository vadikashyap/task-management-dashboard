import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import TaskBoard from "./components/TaskBoard";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='bg-main'>
          <TaskBoard />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
