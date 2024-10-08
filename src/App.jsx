import { Container } from "@mui/material";
import Content from "./components/Content";

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
          
          <Content />
        </Container>
      </div>
    </>
  );
}

export default App;
