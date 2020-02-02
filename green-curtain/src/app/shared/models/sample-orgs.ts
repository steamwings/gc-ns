import { BasicOrg } from "./org.model";

export const SampleOrgs : BasicOrg[] = [
    { id:40, name: "Clasico Theatre", city: "Waco", region: "Texas", stars: 3, parent: null, children: [] },
    { id:34, name: "Liberty Theatre Company", city: "Chicago", region: "Illinois", stars: 4, parent: null, children: [
        {id: 36, name: "Liberty Theatre Downtown", parent:{id:34,name: "Liberty Theatre Company"}, children:[]}
    ] },
]