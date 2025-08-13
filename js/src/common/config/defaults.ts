/**
 * Default configuration for client1-sync-tronscan extension
 * Independent configuration migrated from client1-header-adv
 */

export default {
  app: {
    extensionId: 'wusong8899-client1-sync-tronscan',
    name: 'Client1 Sync Tronscan',
    version: '1.0.0',
  },
  api: {
    endpoints: {
      tronscanList: '/api/syncTronscanList',
      tronscanAdd: '/api/syncTronscanList',
      tronscanUpdate: '/api/syncTronscanList/{id}',
      tronscanDelete: '/api/syncTronscanList/{id}',
      tronscanSort: '/api/syncTronscanList/order',
      tronscanValueUpdate: '/api/syncTronscanValueUsd',
    },
  },
  data: {
    apiResources: {
      tronscanList: 'syncTronscanList',
    },
  },
  ui: {
    containerIds: {
      tronscanText: 'TronscanTextContainer',
      swiperTag: 'swiperTagContainer',
    },
    classes: {
      tronscanSwiper: 'tronscanSwiper',
      tronscanSlide: 'swiper-slide swiper-slide-tag',
      tronscanMask: 'tronscanMask',
      tronscanIcon: 'TronscanTextIcon',
      tronscanContainer: 'TronscanTextContainer',
    },
  },
  swiper: {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 800,
    effect: 'slide',
    grabCursor: true,
    centeredSlides: false,
    loop: true,
  },
  text: {
    containerText: "知名博彩公司USDT/TRC公开链钱包额度",
  },
};
