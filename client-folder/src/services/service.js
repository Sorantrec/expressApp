const gapiService = (func) => {
  if (window.gapi) {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    func(GoogleAuth);
  }
}

export default gapiService;