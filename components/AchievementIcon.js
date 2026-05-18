import { Target, Sprout, Library, GraduationCap, Crown, Trophy, Globe, Flame, Zap, Gem, Sparkles } from "lucide-react";

const MAP = {
  target:   Target,
  sprout:   Sprout,
  books:    Library,
  cap:      GraduationCap,
  crown:    Crown,
  trophy:   Trophy,
  globe:    Globe,
  flame:    Flame,
  zap:      Zap,
  gem:      Gem,
  sparkles: Sparkles,
};

export default function AchievementIcon({ iconKey, className }) {
  const Icon = MAP[iconKey] ?? Sparkles;
  return <Icon className={className}/>;
}
