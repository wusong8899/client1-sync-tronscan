/**
 * Shared type definitions for the SyncTronscan extension
 */

import Model from 'flarum/common/Model';

/**
 * Interface for SyncTronscan model attributes
 */
export interface SyncTronscanAttributes {
  id: string | number;
  name: string;
  url: string;
  img: string;
  desc: string;
  valueUsd: string | number;
  sort: number;
  updateTime: string;
}

/**
 * SyncTronscan model interface extending Flarum's Model
 */
export interface SyncTronscanModel extends Model {
  id(): string | number;
  name(): string;
  url(): string;
  img(): string;
  desc(): string;
  valueUsd(): string | number;
  sort(): number;
  updateTime(): string;
}

/**
 * Props interface for components that receive SyncTronscan data
 */
export interface SyncTronscanItemProps {
  syncTronscanItemData: SyncTronscanModel;
}

/**
 * Props interface for components that optionally receive SyncTronscan data
 */
export interface OptionalSyncTronscanItemProps {
  syncTronscanItemData?: SyncTronscanModel;
}

/**
 * API response interface for order update
 */
export interface OrderUpdateRequest {
  linkQueueOrder: Record<string, number>;
}

/**
 * API response interface for value USD update
 */
export interface ValueUsdUpdateRequest {
  linkID: string | number;
}

/**
 * API response interface for SyncTronscan save/create
 */
export interface SyncTronscanSaveData {
  name: string;
  url?: string;
  img: string;
  desc: string;
}
