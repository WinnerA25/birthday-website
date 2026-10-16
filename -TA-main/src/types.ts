export interface BirthdayPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  tag?: string;
}

export interface InteractiveQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    reaction: string;
    isSuperSweet?: boolean;
  }[];
}

export interface LyricLine {
  id: string;
  timeSec: number;
  text: string;
  subtext?: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  tag?: string;
  themeNote?: string;
  lyrics: LyricLine[];
}

export interface BirthdayConfig {
  recipientName: string;
  nickName: string;
  birthDate: string; // YYYY-MM-DD format for easy date comparison
  loginPhoto: string;
  loginHint: string;
  senderName: string;
  cakeMessage: string;
  letterTitle: string;
  letterSalutation: string;
  letterBody: string[];
  letterSignOff: string;
  songTitle: string;
  songArtist: string;
  lyrics: LyricLine[];
  playlist?: SongItem[];
  selectedSongId?: string;
  questions: InteractiveQuestion[];
  photos: BirthdayPhoto[];
}
