import { useEffect } from 'react';

declare global {
  interface Window {
    _smartsupp: any;
    smartsupp: any;
  }
}

export const SmartsuppChat = () => {
  useEffect(() => {
    // Initialize Smartsupp
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = '76998c90adec4ef0866c21b7056c7eabcfacde30';
    
    // Load Smartsupp script
    if (!window.smartsupp) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      script.src = 'https://www.smartsuppchat.com/loader.js?';
      
      // Insert script before the first script tag
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    }

    // Cleanup function
    return () => {
      // Remove Smartsupp if needed
      const smartsuppScript = document.querySelector('script[src*="smartsuppchat.com"]');
      if (smartsuppScript) {
        smartsuppScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}; 