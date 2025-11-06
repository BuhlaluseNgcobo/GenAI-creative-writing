export enum WritingType {
  Story = 'Story',
  Poem = 'Poem'
}

export enum Tone {
  Funny = 'Funny',
  Serious = 'Serious',
  Inspiring = 'Inspiring',
  Mysterious = 'Mysterious',
  Whimsical = 'Whimsical',
  Dramatic = 'Dramatic',
  Dark = 'Dark',
  Romantic = 'Romantic',
  Satirical = 'Satirical',
  Hopeful = 'Hopeful',
  Tragic = 'Tragic'
}

export enum Theme {
    Adventure = 'Adventure',
    Friendship = 'Friendship',
    Nature = 'Nature',
    SciFi = 'Science Fiction',
    Fantasy = 'Fantasy',
    Mystery = 'Mystery',
    Love = 'Love',
    Loss = 'Loss',
    Revenge = 'Revenge',
    ComingOfAge = 'Coming of Age',
    Betrayal = 'Betrayal',
    Sacrifice = 'Sacrifice',
}

export enum PointOfView {
  FirstPerson = 'First Person (I)',
  SecondPerson = 'Second Person (You)',
  ThirdPersonLimited = 'Third Person Limited',
  ThirdPersonOmniscient = 'Third Person Omniscient',
}

export interface FormState {
  writingType: WritingType;
  theme: string;
  tone: Tone;
  customPrompt: string;
  length: string;
  characters: string;
  writingStyle: string;
  pointOfView: PointOfView;
  setting: string;
}

export interface GeneratedContent {
  id: string;
  type: WritingType;
  theme: string;
  tone: Tone;
  text: string;
  generationTime: number; // in seconds
  isSaved?: boolean;
  imageUrl?: string;
}