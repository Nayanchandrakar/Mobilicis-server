import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();

export const formatAgent = (userAgent: string) => {
  const device = deviceDetector.parse(userAgent);
  return device;
};
