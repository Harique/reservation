export interface ElectronAPI {
  // Add your API method signatures here
  // Example: openFile: () => Promise<string>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
} 