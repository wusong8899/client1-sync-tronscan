/**
 * Simple test utilities for TronscanDataLoader
 * This file can be used for debugging and testing the data loader functionality
 */

import { TronscanDataLoader } from './TronscanDataLoader';

export class TronscanDataLoaderTest {
    private dataLoader: TronscanDataLoader;

    constructor() {
        this.dataLoader = TronscanDataLoader.getInstance();
    }

    /**
     * Test basic data loading functionality
     */
    async testBasicLoading(): Promise<boolean> {
        try {
            const data = await this.dataLoader.loadTronscanList();
            return Array.isArray(data);
        } catch {
            return false;
        }
    }

    /**
     * Test caching functionality
     */
    async testCaching(): Promise<boolean> {
        try {
            // First load
            const data1 = await this.dataLoader.loadTronscanList();
            
            // Second load (should use cache)
            const data2 = await this.dataLoader.loadTronscanList();
            
            // Should return the same reference (cached)
            return data1 === data2;
        } catch {
            return false;
        }
    }

    /**
     * Test refresh functionality
     */
    async testRefresh(): Promise<boolean> {
        try {
            // Load initial data
            await this.dataLoader.loadTronscanList();
            
            // Check if has data
            const hasDataBefore = this.dataLoader.hasData();
            
            // Refresh data
            const refreshedData = await this.dataLoader.refreshTronscanList();
            
            // Should still have data after refresh
            const hasDataAfter = this.dataLoader.hasData();
            
            return hasDataBefore === hasDataAfter && Array.isArray(refreshedData);
        } catch {
            return false;
        }
    }

    /**
     * Test utility methods
     */
    testUtilityMethods(): boolean {
        try {
            // Test loading state
            const isLoading = this.dataLoader.isLoading();
            
            // Test data count
            const count = this.dataLoader.getDataCount();
            
            // Test has data
            const hasData = this.dataLoader.hasData();
            
            return typeof isLoading === 'boolean' && 
                   typeof count === 'number' && 
                   typeof hasData === 'boolean';
        } catch {
            return false;
        }
    }

    /**
     * Run all tests
     */
    async runAllTests(): Promise<{ [key: string]: boolean }> {
        const results = {
            basicLoading: await this.testBasicLoading(),
            caching: await this.testCaching(),
            refresh: await this.testRefresh(),
            utilityMethods: this.testUtilityMethods()
        };

        return results;
    }
}
