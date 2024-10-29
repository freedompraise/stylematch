import { useRouter } from "next/router";
import { Button } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const ComingSoon = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <EmojiEmotionsIcon style={{ fontSize: "5rem", color: "#FF9800" }} />
      <h1 className="text-3xl font-bold mt-4">Hold Tight! 🚧</h1>
      <p className="text-lg mt-2 text-gray-700">
        This feature is still brewing. Our dev team is working hard to bring it
        to life, but great things take time!
      </p>
      <p className="text-sm text-gray-600 italic mt-1">
        In the meantime, feel free to grab a coffee or maybe take a quick nap 😴
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.back()}
        className="mt-6"
      >
        Go Back
      </Button>
    </div>
  );
};

export default ComingSoon;
