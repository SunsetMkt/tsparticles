import type { IRangeHsl, IRangeHsv, IRangeRgb, IRangeValueColor } from "../../Core/Interfaces/Colors";
import { isArray, isString } from "../../Utils/Utils";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IOptionsColor } from "../Interfaces/IOptionsColor";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";

/**
 * [[include:Color.md]]
 */
export class OptionsColor implements IOptionsColor, IOptionLoader<IOptionsColor> {
    value: SingleOrMultiple<SingleOrMultiple<string> | IRangeValueColor | IRangeRgb | IRangeHsl | IRangeHsv>;

    constructor() {
        this.value = "";
    }

    static create(
        source?: OptionsColor,
        data?: SingleOrMultiple<string> | RecursivePartial<IOptionsColor>,
    ): OptionsColor {
        const color = new OptionsColor();

        color.load(source);

        if (data !== undefined) {
            if (isString(data) || isArray(data)) {
                color.load({ value: data });
            } else {
                color.load(data);
            }
        }

        return color;
    }

    load(data?: RecursivePartial<IOptionsColor>): void {
        if (data?.value === undefined) {
            return;
        }

        this.value = data.value;
    }
}
