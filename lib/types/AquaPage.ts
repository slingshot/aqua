/**
 * Data directing the behavior of an Aqua Page.
 */
import { AquaTypes } from './AquaTypes';

export interface AquaPage {
    /** A unique key representing this page. This should match the intended URL slug. */
    key: string;
    /** The page type */
    type: AquaTypes;
}
