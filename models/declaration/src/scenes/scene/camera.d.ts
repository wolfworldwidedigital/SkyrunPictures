import { FreeCamera } from "@babylonjs/core";
export default class PlayerCamera extends FreeCamera {
    private _forwardKey;
    private _backwardKey;
    private _strafeLeftKey;
    private _strafeRightKey;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    private constructor();
    /**
     * Called on the scene starts.
     */
    onStart(): void;
    /**
     * Called each frame.
     */
    onUpdate(): void;
}
