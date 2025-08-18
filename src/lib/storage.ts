// Local storage utility functions for QR code data persistence

export interface QREntry {
  id: string;
  name: string;
  type: string;
  data: any;
  createdAt: number;
  updatedAt: number;
}

export interface QRSettings {
  resolution: string;
  logoSpace: boolean;
  logoSize: number[];
  logoShape: string;
  showBorder: boolean;
  borderThickness: number[];
}

export interface SessionData {
  activeType: string;
  currentFormData: any;
  settings: QRSettings;
}

const STORAGE_KEYS = {
  SAVED_ENTRIES: 'qr_saved_entries',
  SESSION_DATA: 'qr_session_data',
  SETTINGS: 'qr_settings'
};

// Utility functions for local storage operations
export const storage = {
  // Get all saved entries
  getSavedEntries(): QREntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading saved entries:', error);
      return [];
    }
  },

  // Save a new entry
  saveEntry(entry: Omit<QREntry, 'id' | 'createdAt' | 'updatedAt'>): QREntry {
    try {
      const entries = this.getSavedEntries();
      const newEntry: QREntry = {
        ...entry,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      entries.push(newEntry);
      localStorage.setItem(STORAGE_KEYS.SAVED_ENTRIES, JSON.stringify(entries));
      return newEntry;
    } catch (error) {
      console.error('Error saving entry:', error);
      throw error;
    }
  },

  // Update an existing entry
  updateEntry(id: string, updates: Partial<Omit<QREntry, 'id' | 'createdAt'>>): QREntry | null {
    try {
      const entries = this.getSavedEntries();
      const index = entries.findIndex(entry => entry.id === id);
      
      if (index === -1) return null;
      
      entries[index] = {
        ...entries[index],
        ...updates,
        updatedAt: Date.now()
      };
      
      localStorage.setItem(STORAGE_KEYS.SAVED_ENTRIES, JSON.stringify(entries));
      return entries[index];
    } catch (error) {
      console.error('Error updating entry:', error);
      return null;
    }
  },

  // Delete an entry
  deleteEntry(id: string): boolean {
    try {
      const entries = this.getSavedEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      
      localStorage.setItem(STORAGE_KEYS.SAVED_ENTRIES, JSON.stringify(filteredEntries));
      return true;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  },

  // Get entries by type
  getEntriesByType(type: string): QREntry[] {
    return this.getSavedEntries().filter(entry => entry.type === type);
  },

  // Session data management
  getSessionData(): SessionData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading session data:', error);
      return null;
    }
  },

  saveSessionData(sessionData: SessionData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION_DATA, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error saving session data:', error);
    }
  },

  // Settings management
  getSettings(): QRSettings | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  },

  saveSettings(settings: QRSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  // Clear all data
  clearAll(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};

// Hook for using storage in React components
export const useStorage = () => {
  return storage;
};