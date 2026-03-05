import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="w-full border-t border-border/20 mt-auto">
    <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
      <span className="text-xs text-muted-foreground font-body">
        © 2026 HeartPlay
      </span>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
        Made with <Heart className="w-3 h-3 text-primary fill-primary/50" /> by Heartplay
      </span>
    </div>
  </footer>
);

export default Footer;
