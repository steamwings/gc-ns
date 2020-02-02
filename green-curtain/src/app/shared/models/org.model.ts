export interface IRef {
    id: number;
    name: string
}

export class Ref implements IRef {
    id: number;
    name: string
}

// This is *where* you actually work (may be a physical location or transient group)
export interface IOrganization {
    id: number;
    name: string,
    parent: IRef;
    children: IOrganization[];
}

export class BasicOrg implements IOrganization {
    id: number;
    name: string;
    city: string;
    region: string;
    stars: number;
    parent: IRef;
    children: IOrganization[];
}