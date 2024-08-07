interface DailymotionPlayer {
  play(): void;
  pause(): void;
  seek(seconds: number): void;
  load(options: { video: string }): void;
  destroy(): void;
  addEventListener(event: string, callback: (event: any) => void): void;
}

interface Window {
  DM: {
    player: any; // Replace `any` with the actual type if known
  };
}

export interface DailymotionPlayers {
  player: (element: HTMLElement, options: any) => any;
  [key: string]: any; // Allows for additional properties/methods not explicitly defined
}
