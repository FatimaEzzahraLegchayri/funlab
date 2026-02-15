
export const isNetworkError = (error) => {
    const offlineKeywords = [
      "offline",
      "hors ligne",
      "network-request-failed",
      "unavailable",
      "failed-precondition",
      "connection"
    ];
  
    const errorMessage = error?.message?.toLowerCase() || "";
    
    return (
      (typeof navigator !== 'undefined' && !navigator.onLine) || 
      offlineKeywords.some(keyword => errorMessage.includes(keyword))
    );
};
  

export const getFriendlyErrorMessage = (error) => {
    if (isNetworkError(error)) {
      return "Connexion perdue. Veuillez vérifier votre accès internet.";
    }
    
    if (error.message?.includes("permission-denied")) {
      return "Accès refusé. Vous n'avez pas les permissions nécessaires.";
    }
  
    return error.message || "Une erreur inattendue est survenue.";
};