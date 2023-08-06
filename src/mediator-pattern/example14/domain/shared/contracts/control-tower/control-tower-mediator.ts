import { ControlTower } from "./control-tower";
import { AirplaneInquiry } from "./inquiries";
import { AirplaneRequest } from "./requests";

export interface ControlTowerMediator extends ControlTower {
  sendRequestToControlTower(request: AirplaneRequest): void;
  sendInquiryToControlTower(inquiry: AirplaneInquiry): void;
}
