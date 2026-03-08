import { create } from 'zustand';

interface UIStore {
    // Search
    isSearchOpen: boolean;
    searchQuery: string;

    // Filter drawer (mobile)
    isFilterOpen: boolean;

    // Announcement bar
    isAnnouncementDismissed: boolean;

    // Actions
    openSearch: () => void;
    closeSearch: () => void;
    setSearchQuery: (q: string) => void;

    openFilter: () => void;
    closeFilter: () => void;

    dismissAnnouncement: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
    isSearchOpen: false,
    searchQuery: '',
    isFilterOpen: false,
    isAnnouncementDismissed: false,

    openSearch: () => set({ isSearchOpen: true }),
    closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
    setSearchQuery: (q) => set({ searchQuery: q }),

    openFilter: () => set({ isFilterOpen: true }),
    closeFilter: () => set({ isFilterOpen: false }),

    dismissAnnouncement: () => set({ isAnnouncementDismissed: true }),
}));
