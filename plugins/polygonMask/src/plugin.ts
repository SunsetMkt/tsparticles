import type { Container, IPlugin, RecursivePartial, Main } from "tsparticles-core";
import type { IOptions } from "tsparticles-core/Options/Interfaces/IOptions";
import type { IPolygonMaskOptions } from "./Options/Interfaces/IPolygonMaskOptions";
import { Options } from "tsparticles-core/Options/Classes/Options";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { Type } from "./Enums";
import { PolygonMaskInstance } from "./PolygonMaskInstance";

/**
 * @category Polygon Mask Plugin
 */
class Plugin implements IPlugin {
    public readonly id;

    constructor() {
        this.id = "polygonMask";
    }

    public getPlugin(container: Container): PolygonMaskInstance {
        return new PolygonMaskInstance(container);
    }

    public needsPlugin(options?: RecursivePartial<IOptions & IPolygonMaskOptions>): boolean {
        return options?.polygon?.enable ?? (options?.polygon?.type !== undefined && options.polygon.type !== Type.none);
    }

    public loadOptions(options: Options, source?: RecursivePartial<IOptions & IPolygonMaskOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = (options as unknown) as IPolygonMaskOptions;
        let polygonOptions = optionsCast.polygon as PolygonMask;

        if (polygonOptions?.load === undefined) {
            optionsCast.polygon = polygonOptions = new PolygonMask();
        }

        polygonOptions.load(source?.polygon);
    }
}

export function loadPlugin(tsParticles: Main) {
    const plugin = new Plugin();

    tsParticles.addPlugin(plugin);
}

export type { IPolygonMaskOptions };
export * from "./Enums";
