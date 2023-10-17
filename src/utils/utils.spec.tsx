import { Organization } from "@customTypes/organizationTypes";
import validParams from "./validParams";
import { Space } from "@customTypes/spaceTypes";

describe('utils', () => {
    const spc: Space = {
        id: 0,
        capabilities: [],
        metadataGenerate: false,
        name: 'ASpace',
        state: 'OPEN',
        gdprRelevant: false
    }
    const org: Organization = {
        id: 0,
        name: "AOrganization",
        confidentiality: 'INTERNAL',
        company: "efs",
        spaces: [spc]
    }
    it('should check Params correctly', () => {
        let result = validParams('0', undefined, [org]);
        expect(result).toBeTruthy();
        result = validParams('0', '0', [org]);
        expect(result).toBeTruthy();
        result = validParams(undefined, undefined, [org]);
        expect(result).toBeFalsy();
    });
})