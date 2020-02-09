import { MarkerList } from "./marker.model";
import { IRef } from "./ref.model";
import { IParty } from "./party.model";

// This is *where* you actually work (may be a physical location or transient group)
export interface IOrganization extends IParty {
    id: number;
    name: string,
    parent: IRef;
    children: IOrganization[];
}

export class BasicOrg implements IOrganization {
    id: number;
    name: string;
    city: string;
    markers: MarkerList;
    parent: IRef;
    children: IOrganization[];
}

export class FullOrg extends BasicOrg {
    region: string;
    //TODO
    //owners: User[]
}