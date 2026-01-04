import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="container py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-foreground">
              AI Trust Copilot
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>Made with 🩷 by Team Hackerz</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
