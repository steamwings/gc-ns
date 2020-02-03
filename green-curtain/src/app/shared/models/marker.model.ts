import { Blurb } from "./blurb.model";

/**
 * Type of marker in [Highlight, Concern, Flag]
 */
export enum MarkerType {
    Highlight = 1,
    Concern,
    Flag
}

/**
 * A "marker" is a positive or negative user-created indicator
 */
export interface Marker {
    type : MarkerType;
    blurb : Blurb;
}

export class Highlight implements Marker {
    type: MarkerType = MarkerType.Highlight;
    blurb: Blurb;
}

export class Concern implements Marker {
    type: MarkerType = MarkerType.Concern;
    blurb: Blurb;
}

export class Flag implements Marker {
    type: MarkerType = MarkerType.Flag;
    blurb: Blurb;
}

export class MarkerList {
    highlights : Highlight[];
    concerns: Concern[];
    flags: Flag[];

    constructor() {
        this.highlights = [];
        this.concerns = [];
        this.flags = [];
    }
}