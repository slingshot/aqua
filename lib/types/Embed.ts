import { AquaPage } from './AquaPage';

/**
 * An embed-based Aqua page
 */
export interface Embed extends AquaPage {
    /** Target URL for embed */
    target: string;
    /** Hosted page title */
    title?: string;
    /** Description for meta tags */
    description?: string;
}
