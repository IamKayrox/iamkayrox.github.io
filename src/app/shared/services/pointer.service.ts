import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Vector2D } from "../models/vector2d.model";

@Injectable()
export class PointerService implements OnDestroy {
    private mouse_pos = new Vector2D();
    private mouse_delta = new Vector2D();
    private mouse_pos_subject = new Subject<Vector2D>();
    private mouse_delta_subject = new Subject<Vector2D>();
    private button0_state: boolean = false;
    private button0_state_subject = new Subject<boolean>();
    private button1_state: boolean = false;
    private button1_state_subject = new Subject<boolean>();

    private abortController = new AbortController();

    constructor() {
        window.addEventListener('mousemove', this.onMouseMove.bind(this), { signal: this.abortController.signal });
        window.addEventListener('mouseup', this.onMouseUp.bind(this), { signal: this.abortController.signal });
        window.addEventListener('mousedown', this.onMouseDown.bind(this), { signal: this.abortController.signal });
    }

    ngOnDestroy(): void {
        this.abortController.abort();
        this.mouse_pos_subject.complete();
        this.mouse_delta_subject.complete();
    }

    private onMouseMove(ev: MouseEvent) {
        this.mouse_pos = new Vector2D(ev.clientX, ev.clientY)
        this.mouse_pos_subject.next(this.mouse_pos);
        this.mouse_delta = new Vector2D(ev.movementX, ev.movementY);
        this.mouse_delta_subject.next(this.mouse_delta);
    }

    private onMouseDown(ev: MouseEvent) {
        switch(ev.button) {
            case 0:
                this.button0_state = true;
                this.button0_state_subject.next(this.button0_state);
                break;
            case 1:
                this.button1_state = true;
                this.button1_state_subject.next(this.button1_state);
                break;
        }
    }

    private onMouseUp(ev: MouseEvent) {
        switch(ev.button) {
            case 0:
                this.button0_state = false;
                this.button0_state_subject.next(this.button0_state);
                break;
            case 1:
                this.button1_state = false;
                this.button1_state_subject.next(this.button1_state);
                break;
        }
    }

    get position() {
        return this.mouse_pos_subject.asObservable();
    }

    get delta() {
        return this.mouse_delta_subject.asObservable();
    }

    get button0() {
        return this.button0_state_subject.asObservable();
    }

    get button1() {
        return this.button1_state_subject.asObservable();
    }

    get snapshot() {
        return {
            position: new Vector2D(this.mouse_pos.x, this.mouse_pos.y),
            delta: new Vector2D(this.mouse_delta.x, this.mouse_delta.y),
            button0: this.button0_state,
            button1: this.button1_state,
        }
    }
}