import safeWhiteIcon from "../../../assets/1_Performance Tracking/Icon_Safe_White.svg";
import cleanWhiteIcon from "../../../assets/1_Performance Tracking/Icon_Clean_White.svg";
import efficientWhiteIcon from "../../../assets/1_Performance Tracking/Icon_Efficient_White.svg";
import connectedWhiteIcon from "../../../assets/1_Performance Tracking/Icon_Connected_White.svg";

import safeGrayIcon from "../../../assets/1_Performance Tracking/Icon_Safe_Gray.svg";
import cleanGrayIcon from "../../../assets/1_Performance Tracking/Icon_Clean_Gray.svg";
import efficientGrayIcon from "../../../assets/1_Performance Tracking/Icon_Efficient_Gray.svg";
import connectedGrayIcon from "../../../assets/1_Performance Tracking/Icon_Connected_Gray.svg";

import { PerformanceArea } from "../../../types/PerformanceArea";

export const whiteIcons: Record<PerformanceArea, string> = {
  [PerformanceArea.Safe]: safeWhiteIcon,
  [PerformanceArea.Clean]: cleanWhiteIcon,
  [PerformanceArea.Efficient]: efficientWhiteIcon,
  [PerformanceArea.Connected]: connectedWhiteIcon,
};

export const grayIcons: Record<PerformanceArea, string> = {
  [PerformanceArea.Safe]: safeGrayIcon,
  [PerformanceArea.Clean]: cleanGrayIcon,
  [PerformanceArea.Efficient]: efficientGrayIcon,
  [PerformanceArea.Connected]: connectedGrayIcon,
};
