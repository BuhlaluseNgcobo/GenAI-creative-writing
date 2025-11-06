import { Tone, Theme, WritingType, PointOfView } from './types';

export const WRITING_TYPES: WritingType[] = [WritingType.Story, WritingType.Poem];
export const TONES: Tone[] = [
    Tone.Funny, 
    Tone.Serious, 
    Tone.Inspiring, 
    Tone.Mysterious, 
    Tone.Whimsical, 
    Tone.Dramatic,
    Tone.Dark,
    Tone.Romantic,
    Tone.Satirical,
    Tone.Hopeful,
    Tone.Tragic
];
export const THEMES: Theme[] = [
    Theme.Adventure, 
    Theme.Friendship, 
    Theme.Nature, 
    Theme.SciFi, 
    Theme.Fantasy, 
    Theme.Mystery,
    Theme.Love,
    Theme.Loss,
    Theme.Revenge,
    Theme.ComingOfAge,
    Theme.Betrayal,
    Theme.Sacrifice,
];
export const POINTS_OF_VIEW: PointOfView[] = [
    PointOfView.FirstPerson,
    PointOfView.SecondPerson,
    PointOfView.ThirdPersonLimited,
    PointOfView.ThirdPersonOmniscient,
];