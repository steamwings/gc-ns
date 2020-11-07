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

abstract class MarkerBase implements Marker {
    type: MarkerType;
    blurb: Blurb;
    // TODO uncomment
    // constructor(blurb: Blurb) {
    //     this.blurb = blurb;
    // }
    constructor(){
        this.blurb = null;
    }
}

export class Highlight extends MarkerBase {
    type: MarkerType = MarkerType.Highlight;
    blurb: Blurb;
}

export class Concern extends MarkerBase {
    type: MarkerType = MarkerType.Concern;
    blurb: Blurb;
}

export class Flag extends MarkerBase {
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