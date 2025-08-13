import app from 'flarum/forum/app';
import defaultConfig from '../../common/config/defaults';

/**
 * TronscanDataLoader - Handles loading and caching of Tronscan data
 * Migrated from client1-header-adv extension for independent operation
 */
export class TronscanDataLoader {
    private static instance: TronscanDataLoader;

    // Loading states
    private tronscanListLoading = false;

    // Data storage
    private tronscanList: any[] | null = null;

    private constructor() { }

    /**
     * Get singleton instance
     */
    static getInstance(): TronscanDataLoader {
        if (!TronscanDataLoader.instance) {
            TronscanDataLoader.instance = new TronscanDataLoader();
        }
        return TronscanDataLoader.instance;
    }

    /**
     * Load Tronscan data
     * @returns {Promise<any[]>} Promise resolving to tronscan data
     */
    async loadTronscanList(): Promise<any[]> {
        if (this.tronscanListLoading) {
            return this.waitForTronscanList();
        }

        if (this.tronscanList !== null) {
            return this.tronscanList;
        }

        this.tronscanListLoading = true;

        try {
            const results = await app.store.find(defaultConfig.data.apiResources.tronscanList).catch(() => []);
            this.tronscanList = [];

            if (Array.isArray(results)) {
                this.tronscanList.push(...results);
            } else if (results) {
                // Handle single item response
                this.tronscanList.push(results);
            }

            return this.tronscanList;
        } catch {
            // Silently handle errors and return empty array
            this.tronscanList = [];
            return this.tronscanList;
        } finally {
            this.tronscanListLoading = false;
        }
    }

    /**
     * Get cached Tronscan list
     */
    getTronscanList(): any[] | null {
        return this.tronscanList;
    }

    /**
     * Clear cached data
     */
    clearCache(): void {
        this.tronscanList = null;
    }

    /**
     * Refresh Tronscan data
     */
    async refreshTronscanList(): Promise<any[]> {
        this.clearCache();
        return this.loadTronscanList();
    }

    /**
     * Check if data is currently loading
     */
    isLoading(): boolean {
        return this.tronscanListLoading;
    }

    /**
     * Check if data is available
     */
    hasData(): boolean {
        return this.tronscanList !== null && this.tronscanList.length > 0;
    }

    /**
     * Get data count
     */
    getDataCount(): number {
        return this.tronscanList ? this.tronscanList.length : 0;
    }

    /**
     * Force reload data (bypass cache)
     */
    async forceReload(): Promise<any[]> {
        this.tronscanListLoading = false; // Reset loading state
        this.clearCache();
        return this.loadTronscanList();
    }

    /**
     * Helper method for waiting for data to load
     */
    private async waitForTronscanList(): Promise<any[]> {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (!this.tronscanListLoading && this.tronscanList !== null) {
                    clearInterval(checkInterval);
                    resolve(this.tronscanList);
                }
            }, 100);

            // Add timeout to prevent infinite waiting
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve(this.tronscanList || []);
            }, 10000); // 10 second timeout
        });
    }
}
