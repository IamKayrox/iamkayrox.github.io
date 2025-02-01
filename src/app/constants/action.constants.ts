import { InjectionToken } from "@angular/core";
import { Action } from "../models/actions.model";

export const WindowAction = new InjectionToken<Action>("__WINDOW__ACTION__");