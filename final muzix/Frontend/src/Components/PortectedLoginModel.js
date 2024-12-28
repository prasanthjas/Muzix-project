import { Typography } from "@mui/material";
import Login from "./Login";

export default function ProtectedLoginModel() {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center'}}>Login</Typography>
        <Login />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // Horizontally center
    alignItems: 'center', // Vertically center
    height: '80vh', // Full height of the viewport
    backgroundColor: ' rgb(18, 18, 18)', // Optional: Background color
  },
  innerContainer: {
    width: '100%', // Make it responsive
    maxWidth: '400px', // Set a max-width for the form
    padding: '20px', // Padding around the form
    backgroundColor: '#fff', // Background color for the form container
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Shadow for a nicer look
    borderRadius: '8px', // Optional: Rounded corners
  },
};
