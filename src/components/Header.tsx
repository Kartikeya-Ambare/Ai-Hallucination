import { Shield, Github } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground tracking-tight">
              AI Trust Copilot
            </span>
            <span className="text-xs text-muted-foreground -mt-0.5">
              Verify before you trust
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => window.open("https://github.com/ByteQuest-2025/GFGBQ-Team-team-hackerz", "_blank")}
          >
            <Github className="w-4 h-4 mr-1.5" />
            GitHub
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
