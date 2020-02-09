import { BasicOrg, FullOrg } from "./org.model";
import { MarkerList, Flag, Highlight, Concern } from "./marker.model";

const emptyMarkerList : MarkerList = {highlights:[], concerns:[], flags:[]}
const sampleMarkerList: MarkerList = { highlights: [], concerns: [], flags: [] }

export const SampleOrgs : FullOrg[] = [
    { id:40, name: "Clasico Theatre", city: "Waco", region: "Texas", markers:emptyMarkerList, parent: null, children: [] },
    { id:34, name: "Liberty Theatre Company", city: "Chicago", region: "Illinois", markers:null, parent: null, children: [
        {id: 36, name: "Liberty Theatre Downtown", parent:{id: 34, name: "Liberty Theatre Company"}, children:[]}
    ] },
]