import { Container } from "@mui/material";
import MainContent from "./Components/Maincontent";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "95vw",
        }}
      >
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
