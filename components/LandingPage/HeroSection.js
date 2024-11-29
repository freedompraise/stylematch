import { Container, Typography, Button } from "@mui/material";
import { config } from "../../landing.config";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${config.hero.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 20px",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" className="mb-4 font-bold text-black">
          Transform Your Local Business into a Credible Online Store.
        </Typography>
        <Typography variant="h6" className="mb-6 text-black">
          Easily manage your catalog, automate payments, and organize
          deliveries—all in one place.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/auth?mode=signup"
        >
          Get Started for Free
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;
