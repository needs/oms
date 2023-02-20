import Constants from "expo-constants";

const { manifest } = Constants;

export const getServerUrl = () => {
  const url = process.env.SERVER_URL;

  if (url === undefined) {
    const debuggerHost = manifest?.debuggerHost;
    if (debuggerHost !== null) {
      return `http://${debuggerHost.split(':').shift()}:3333`;
    } else {
      throw new Error('SERVER_URL is not defined');
    }
  } else {
    return url;
  }
}
