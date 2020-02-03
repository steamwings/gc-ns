import { BasicOrg, FullOrg } from "./org.model";

export const SampleOrgs : FullOrg[] = [
    { id:40, name: "Clasico Theatre", city: "Waco", region: "Texas", markers:null, parent: null, children: [] },
    { id:34, name: "Liberty Theatre Company", city: "Chicago", region: "Illinois", markers:null, parent: null, children: [
        {id: 36, name: "Liberty Theatre Downtown", parent:{id:34,name: "Liberty Theatre Company"}, children:[]}
    ] },
]