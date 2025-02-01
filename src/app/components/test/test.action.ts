import { Action, ActionType } from "../../models/actions.model";
import { ReadonlyVector2D } from "../../models/vector-2d.model";
import { TestComponent } from "./test.component";

export const TEST_ACTION: Action = {
  title: "Test action",
  defaultWindowSize: new ReadonlyVector2D(800, 600),
  type: ActionType.Component,
  component: TestComponent,
}