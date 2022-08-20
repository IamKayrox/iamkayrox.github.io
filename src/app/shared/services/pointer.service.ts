import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Vector2D } from "../models/vector2d.model";

@Injectable()
export class PointerService implements OnDestroy {
    private mouse_pos?: Vector2D;
    private mouse_delta = new Vector2D();
    private mouse_pos_subject = new Subject<Vector2D>();
    private mouse_delta_subject = new Subject<Vector2D>();
    private button0_state: boolean = false;
    private button0_state_subject = new Subject<boolean>();
    private button1_state: boolean = false;
    private button1_state_subject = new Subject<boolean>();

    private abortController = new AbortController();
    private globalController = new AbortController();

    private desktop?: HTMLElement;

    constructor() {
        window.addEventListener('mousemove', ($event) => this.onMouseMove($event), { signal: this.globalController.signal });
        window.addEventListener('mouseup', this.onMouseUp.bind(this), { signal: this.globalController.signal });
        window.addEventListener('mousedown', this.onMouseDown.bind(this), { signal: this.globalController.signal });
        window.addEventListener('mouseleave', () => this.onMouseLeave(), { signal: this.globalController.signal });
    }

    initializeService(el: HTMLElement) {
        this.globalController.abort();
        this.desktop = el;
        el.addEventListener('mousemove', this.onMouseMove.bind(this), { signal: this.abortController.signal });
        el.addEventListener('mouseup', this.onMouseUp.bind(this), { signal: this.abortController.signal });
        el.addEventListener('mousedown', this.onMouseDown.bind(this), { signal: this.abortController.signal });
        el.addEventListener('mouseleave', () => this.onMouseLeave(), { signal: this.abortController.signal });
    }

    ngOnDestroy(): void {
        this.globalController.abort();
        this.abortController.abort();
        this.mouse_pos_subject.complete();
        this.mouse_delta_subject.complete();
        this.button0_state_subject.complete();
        this.button1_state_subject.complete();
    }

    private onMouseMove(ev: MouseEvent) {
        this.mouse_delta = new Vector2D(ev.movementX, ev.movementY);
        this.mouse_delta_subject.next(this.mouse_delta);
        this.mouse_pos = new Vector2D(Math.max(ev.clientX, 0), Math.max(ev.clientY, 0));
        this.mouse_pos_subject.next(this.mouse_pos);
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
        this.releaseButton(ev.button);
    }

    private onMouseLeave() {
        this.releaseButton(0);
        this.releaseButton(1);
    }

    private releaseButton(button: number) {
        switch(button) {
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
            position: new Vector2D(this.mouse_pos?.x, this.mouse_pos?.y),
            delta: new Vector2D(this.mouse_delta.x, this.mouse_delta.y),
            button0: this.button0_state,
            button1: this.button1_state,
        }
    }
}