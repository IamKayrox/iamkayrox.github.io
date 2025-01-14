import { Type } from "@angular/core";

export enum ActionType {
  Web = "web-action",
  Component = "component-action",
}

export interface WebAction {
  type: ActionType.Web;
  url: string;
  title?: string;
}

export interface ComponentAction {
  type: ActionType.Component;
  component: Type<unknown>;
  injectionParams?: unknown;
}

export type Action = WebAction | ComponentAction;
