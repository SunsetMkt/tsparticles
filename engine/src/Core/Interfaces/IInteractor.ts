import type { IInteractivity } from "../../Options/Interfaces/Interactivity/IInteractivity";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { Interactivity } from "../../Options/Classes/Interactivity/Interactivity";
import type { InteractorType } from "../../Enums/Types/InteractorType";
import type { Options } from "../../Options/Classes/Options";
import type { Particle } from "../Particle";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 * @category Interfaces
 */
export interface IInteractor {
    loadInteractivityOptions?: (
        options: Interactivity,
        ...sources: RecursivePartial<IInteractivity | undefined>[]
    ) => void;

    loadOptions?: (options: Options, ...sources: (RecursivePartial<IOptions> | undefined)[]) => void;

    loadParticlesOptions?: (
        options: ParticlesOptions,
        ...sources: (RecursivePartial<IParticlesOptions> | undefined)[]
    ) => void;

    type: InteractorType;

    clear(particle: Particle): void;

    init(): void;

    reset(particle: Particle): void;
}
