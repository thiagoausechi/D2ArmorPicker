import { ArmorPerkOrSlot, StatModifier } from "../enum/armor-stat";
import { IPermutatorArmor } from "./IPermutatorArmor";

export interface IPermutatorArmorSet {
  armor: number[];
  usedArtifice: StatModifier[];
  usedMods: StatModifier[];
  classItemPerk: ArmorPerkOrSlot;
  statsWithMods: number[];
  statsWithoutMods: number[];
}

export function createArmorSet(
  helmet: IPermutatorArmor,
  gauntlet: IPermutatorArmor,
  chest: IPermutatorArmor,
  leg: IPermutatorArmor,
  usedArtifice: StatModifier[],
  usedMods: StatModifier[],
  statsWithMods: number[],
  statsWithoutMods: number[]
): IPermutatorArmorSet {
  return {
    armor: [helmet.id, gauntlet.id, chest.id, leg.id],
    usedArtifice,
    usedMods,
    classItemPerk: ArmorPerkOrSlot.None,
    statsWithMods,
    statsWithoutMods,
  };
}

export function isIPermutatorArmorSet(obj: any): obj is IPermutatorArmorSet {
  return (
    Object.prototype.hasOwnProperty.call(obj, "armor") &&
    Object.prototype.hasOwnProperty.call(obj, "usedArtifice") &&
    Object.prototype.hasOwnProperty.call(obj, "usedMods") &&
    Object.prototype.hasOwnProperty.call(obj, "statsWithMods") &&
    Object.prototype.hasOwnProperty.call(obj, "classItemPerk")
  );
}
