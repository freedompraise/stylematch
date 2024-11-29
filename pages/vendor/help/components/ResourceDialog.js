import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ResourceDialog = ({ resource, open, onClose }) => {
  if (!resource) {
    console.warn("Resource is undefined in ResourceDialog");
    return null; // Do not render if resource is invalid
  }

  const { title = "Untitled", content = "No content available" } = resource;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" component="div">
          {content}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDialog;
