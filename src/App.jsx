import { Toaster } from "react-hot-toast";
import { RootRouter } from "./routes";
import { CssBaseline } from "@mui/material";
import "react-photo-view/dist/react-photo-view.css";

const App = () => {
  return (
    <>
      <Toaster />
      <RootRouter />
      <CssBaseline />
    </>
  );
};

export default App;
