import { TronscanDataLoader } from '../services/TronscanDataLoader';
import { DOMUtils } from '../utils/DOMUtils';
import { MobileDetection } from '../utils/MobileDetection';
import defaultConfig from '../../common/config/defaults';

/**
 * TronscanUIManager - Manages Tronscan UI components and interactions
 * Migrated from client1-header-adv extension for independent operation
 */
export class TronscanUIManager {
    private dataLoader: TronscanDataLoader;

    constructor() {
        this.dataLoader = TronscanDataLoader.getInstance();
    }

    /**
     * Initialize Tronscan UI components
     */
    async initialize(): Promise<void> {
        await this.addTronscan();
    }

    /**
     * Add Tronscan component
     */
    private async addTronscan(): Promise<void> {
        const tronscanList = await this.dataLoader.loadTronscanList();

        if (DOMUtils.getElementById(defaultConfig.ui.containerIds.tronscanText) || tronscanList.length === 0) {
            return;
        }

        this.createTronscanContainer();
        const swiper = this.createTronscanSwiper();
        const wrapper = this.createTronscanWrapper(swiper);

        this.populateTronscanSlides(wrapper, tronscanList);
        this.initializeTronscanSwiper();
    }

    /**
     * Create Tronscan container
     */
    private createTronscanContainer(): HTMLElement {
        const container = DOMUtils.createElement('div', {
            id: defaultConfig.ui.containerIds.tronscanText,
            className: defaultConfig.ui.classes.tronscanContainer
        }, `<div class='${defaultConfig.ui.classes.tronscanIcon}'></div>${defaultConfig.text.containerText}`);

        const swiperContainer = DOMUtils.getElementById(defaultConfig.ui.containerIds.swiperTag);
        if (swiperContainer) {
            DOMUtils.appendChild(swiperContainer, container);
        }

        return container;
    }

    /**
     * Create Tronscan swiper
     */
    private createTronscanSwiper(): HTMLElement {
        const swiper = DOMUtils.createElement('div', {
            className: `swiper ${defaultConfig.ui.classes.tronscanSwiper}`
        });

        const swiperContainer = DOMUtils.getElementById(defaultConfig.ui.containerIds.swiperTag);
        if (swiperContainer) {
            DOMUtils.appendChild(swiperContainer, swiper);
        }

        return swiper;
    }

    /**
     * Create Tronscan wrapper
     */
    private createTronscanWrapper(swiper: HTMLElement): HTMLElement {
        const wrapper = DOMUtils.createElement('div', {
            className: 'swiper-wrapper'
        });
        DOMUtils.appendChild(swiper, wrapper);
        return wrapper;
    }

    /**
     * Populate Tronscan slides
     */
    private populateTronscanSlides(wrapper: HTMLElement, tronscanList: any[]): void {
        tronscanList.forEach(tronscanData => {
            const slide = this.createTronscanSlide(tronscanData);
            DOMUtils.appendChild(wrapper, slide);
        });
    }

    /**
     * Create individual Tronscan slide
     */
    private createTronscanSlide(tronscanData: any): HTMLElement {
        const slide = DOMUtils.createElement('div', {
            className: defaultConfig.ui.classes.tronscanSlide
        });

        const name = tronscanData.name ? tronscanData.name() : 'Unknown';
        const valueUsd = tronscanData.valueUsd ? tronscanData.valueUsd() : '0';
        const url = tronscanData.url ? tronscanData.url() : '#';
        const img = tronscanData.img ? tronscanData.img() : '';

        slide.innerHTML = `
            <a href="${url}" target="_blank" class="tronscan-link">
                <div class="tronscan-content">
                    <img src="${img}" alt="${name}" class="tronscan-image" />
                    <div class="tronscan-info">
                        <div class="tronscan-name">${name}</div>
                        <div class="tronscan-value">$${valueUsd}</div>
                    </div>
                </div>
            </a>
        `;

        return slide;
    }

    /**
     * Initialize Tronscan swiper
     */
    private initializeTronscanSwiper(): void {
        try {
            const config = MobileDetection.getTagSwiperConfig();
            const swiperConfig = {
                ...defaultConfig.swiper,
                spaceBetween: config.spaceBetween,
                slidesPerView: config.slidesPerView,
                breakpoints: config.breakpoints
            };

            // @ts-ignore - Swiper is loaded globally
            const swiperInstance = new Swiper(`.${defaultConfig.ui.classes.tronscanSwiper}`, swiperConfig);

            // Store reference for potential cleanup
            if (swiperInstance) {
                // Swiper initialized successfully
            }
        } catch {
            // Silently handle swiper initialization errors
        }
    }
}
